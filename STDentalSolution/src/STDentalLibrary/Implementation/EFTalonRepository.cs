using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using STDentalLibrary.Context;
using STDentalLibrary.Models;
using STDentalLibrary.Models.Enums;
using STDentalLibrary.Models.ModelsResponse;
using STDentalLibrary.Repositories;

namespace STDentalLibrary.Implementation
{
    public class EFTalonRepository : ITalonRepository
    {
        private readonly IConfiguration _configuration;
        public EFTalonRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /*public async Task<IEnumerable<Talon>> GetTalonsAsync(int page, int itemsPerPage)
        {
            await using (var context = CreateContext())
            {
                return await context.Talons
                    .Include(s => s.Staff)
                    .Include(p => p.Patient)
                    .Where(q => q.CreateDate > DateTime.UtcNow.AddDays(-360))
                    .OrderBy(a => a.PaymentStatus)
                    .ThenByDescending(s => s.CreateDate)
                    .ThenByDescending(s => s.TalonId)
                    .Skip((page - 1) * itemsPerPage)
                    .Take(itemsPerPage)
                    .ToListAsync();
            }
        }*/

        public async Task<int> AddPaymentAsync(Payment payment)
        {
            await using (var context = CreateContext())
            {
                var res = await context.Payments.AddAsync(payment);
                await context.SaveChangesAsync();
                return res.Entity.PaymentId;
            }
        }
        public async Task<int> AddTalonAsync(Talon talon)
        {
            await using (var context = CreateContext())
            {
                var res = await context.Talons.AddAsync(talon);
                await context.SaveChangesAsync();
                return res.Entity.TalonId;
            }
        }

        /*public async Task<bool> AddTalonServiceAsync(List<TalonService> servicesList)
        {
            try
            {
                await using (var context = CreateContext())
                {
                    foreach (var service in servicesList)
                    {
                        var res = await context.TalonServices.AddAsync(service);
                    }
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"TalonService didn`t add. Detail: {e.StackTrace}");
                return false;
            }
            
        }*/

        public async Task DeleteTalonAsync(int talonId)
        {            
            await using (var context = CreateContext())
            {
                //var helper = new EFHelperRepository(context);

                //if ((await helper.CheckContainTalonInPayment(talonId)) == false) return false;

                var delTalon = await context.Talons.FindAsync(talonId);

                //if (delTalon.PaymentStatus != PaymentStatus.NotPaid) return false;

                context.Talons.Remove(delTalon);
                await context.SaveChangesAsync();
            }            
        }

        public async Task<int> GetCountTalonsAsync(int? patientId, int? doctorId, DateTime? startDate, DateTime? endDate)
        {
            await using (var context = CreateContext())
            {
                var query = context.Talons.AsQueryable();

                if (patientId.HasValue)
                    query = query.Where(p => p.PatientId == patientId);
                if (doctorId.HasValue)
                    query = query.Where(s => s.StaffId == doctorId);
                if (startDate.HasValue)
                    query = query.Where(e => e.CreateDate >= startDate);
                if (endDate.HasValue)
                    query = query.Where(q => q.CreateDate <= endDate);
            

            return await query.CountAsync();
            }
        }

        public async Task<IEnumerable<Talon>> GetTalonsFilterAsync(int page, int itemsPerPage, int? patientId, int? doctorId, DateTime? startDate, DateTime? endDate)
        {
            await using (var context = CreateContext())
            {
                var query = context.Talons
                    .Include(s => s.Staff)
                    .Include(p => p.Patient).AsQueryable();

                if (patientId.HasValue)
                    query = query.Where(p => p.PatientId == patientId);
                if (doctorId.HasValue)
                    query = query.Where(s => s.StaffId == doctorId);
                if (startDate.HasValue)
                    query = query.Where(e => e.CreateDate >= startDate);
                if (endDate.HasValue)
                    query = query.Where(q => q.CreateDate <= endDate);

                return await query.OrderBy(a => a.PaymentStatus)
                    .ThenByDescending(s => s.CreateDate)
                    .ThenByDescending(s => s.TalonId)
                    .Skip((page - 1) * itemsPerPage)
                    .Take(itemsPerPage)
                    .ToListAsync();
            }
        }
        public async Task<Talon> GetTalonAsync(int talonId)
        {
            await using (var context = CreateContext())
            {
                return await context.Talons
                    .Include(d => d.Staff)
                    .Include(w => w.Patient)
                    .Where(w => w.TalonId == talonId)
                    .FirstOrDefaultAsync();
            }
        }
        public async Task<IEnumerable<TalonService>> GetTalonServicesAsync(int talonId)
        {
            await using (var context = CreateContext())
            {
                return await context.TalonServices
                    .Include(e => e.Service)
                    .Where(w => w.TalonId == talonId)
                    .OrderBy(s => s.Service.Shifr)
                    .ToListAsync();
            }
        }
        public async Task UpdateTalonAsync(Talon talon)
        {
            await using (var context = CreateContext())
            {
                context.Talons.Attach(talon);

                /*var oldTalon = await context.Talons.FindAsync(talon.TalonId);

                oldTalon.PatientId = talon.PatientId;
                oldTalon.StaffId = talon.StaffId;
                oldTalon.Cost = talon.Cost;
                oldTalon.Description = talon.Description;


                context.Talons.Update(oldTalon);*/

                await context.SaveChangesAsync();
            }
        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDentalDB"));
        }
    }
}
