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
    public class EFStaffRepository : IStaffRepository
    {
        private readonly IConfiguration _configuration;

        public EFStaffRepository (IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<int> AddStaffAsync(Staff staff)
        {
            await using (var context = CreateContext())
            {
                var res = await context.Staffs.AddAsync(staff);
                return res.Entity.StaffId;
            }
        }

        public async Task<bool> FireStaffAsync(int staffId)
        {
            try
            {
                await using (var context = CreateContext())
                {
                    var fireStaff = await context.Staffs.FindAsync(staffId);

                    if (fireStaff == null) return false;

                    context.Staffs.Remove(fireStaff);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<Staff>> GetActualStaffsAsync()
        {
            await using (var context = CreateContext())
            {
                return await context.Staffs
                    .Include(e => e.Post)
                    .Where(q => q.StaffStatus == StaffStatus.Works)
                    .OrderBy(s => s.StaffId)
                    .ToListAsync();
            }
        }

        public async Task<IEnumerable<DoctorComboBox>> GetFoundedStaffsInTalonsAsync()
        {
            await using (var context = CreateContext())
            {
                return await context.Talons
                    .Include(e => e.Staff)
                    .Select(x => new DoctorComboBox { Id = x.StaffId.ToString(), Name = x.Staff.Name })
                    .Distinct()
                    .ToListAsync();
            }
            
        }

        public async Task<Staff> GetStaffAsync(int staffId)
        {
            await using (var context = CreateContext())
            {
                return await context.Staffs
                    .Include(e => e.Post)
                    .Where(w => w.StaffId == staffId)
                    .FirstAsync();
            }
        }

        public async Task<bool> UpdateStaffAsync(Staff staff)
        {
            try
            {
                await using var context = CreateContext();

                context.Staffs.Attach(staff);

                await context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDentalDB"));
        }
    }
}
