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

        public async Task DeleteTalonAsync(int talonId)
        {            
            await using (var context = CreateContext())
            {
                var delTalon = await context.Talons.FindAsync(talonId);

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
                var talonBase = await context.Talons.FindAsync(talon.TalonId);

                var talonServs = await context.TalonServices
                    .Where(w => w.TalonId == talon.TalonId)
                    .ToArrayAsync();

                foreach(var serv in talonServs)
                {
                    context.TalonServices.Remove(serv);
                }                

                talonBase.PatientId = talon.PatientId;
                talonBase.StaffId = talon.StaffId;
                talonBase.Cost = talon.Cost;
                talonBase.Description = talon.Description;
                talonBase.Summa = talon.Summa;
                talonBase.TalonServices = talon.TalonServices;
                talonBase.CreateDate = talon.CreateDate;
                talonBase.ChangeDate = talon.ChangeDate;

                //context.Talons.Attach(talon);

                await context.SaveChangesAsync();
            }
        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDentalDB"));
        }

        public async Task<Staff> Authorization(Authorization authorization)
        {
            await using (var context = CreateContext())
            {
                return await context.Staffs
                    .Include(q => q.StaffCredential)
                    .Where(w => w.StaffCredential.UserLogin == authorization.Username ||
                                w.StaffCredential.UserPass == authorization.Password)
                    .FirstOrDefaultAsync();
            }
        }
    }
}
