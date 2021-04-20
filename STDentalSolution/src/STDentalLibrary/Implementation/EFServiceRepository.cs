using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using STDentalLibrary.Context;
using STDentalLibrary.Models;
using STDentalLibrary.Repositories;

namespace STDentalLibrary.Implementation
{
    public class EFServiceRepository : IServiceRepository
    {
        private readonly IConfiguration _configuration;

        public EFServiceRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<int> AddServiceAsync(Service service)
        {
            await using (var context = CreateContext())
            {
                var res = await context.Services.AddAsync(service);
                return res.Entity.ServiceId;
            }
        }

        public async Task<bool> DeleteServiceAsync(int serviceId)
        {
            try
            {
                await using (var context = CreateContext())
                {
                    var delServ = await context.Services.FindAsync(serviceId);

                    if (delServ == null) return false;

                    context.Services.Remove(delServ);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<Service>> GetActualServicesAsync()
        {
            await using (var context = CreateContext())
            {
                return await context.Services
                    .Where(q => q.EndDate == null)
                    .OrderBy(s => s.Shifr)
                    .ToListAsync();
            }
        }

        public async Task<IEnumerable<Service>> GetServicesAsync()
        {
            await using (var context = CreateContext())
            {
                return await context.Services
                    .Where(q => q.EndDate == null)
                    .OrderBy(s => s.Shifr)
                    .OrderBy(s => s.ServiceId)
                    .ToListAsync();
            }
        }

        public Task<bool> UpdateServiceAsync(Service service)
        {
            //удалить записи из ServiceMaterial

            //удалить записи из ServiceCostCalculation

            //сохранить service в Service, ServiceMaterial, ServiceCostCalculation

            throw new NotImplementedException();
        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDentalDB"));
        }
    }
}
