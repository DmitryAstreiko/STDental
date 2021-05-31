using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using STDentalLibrary.Context;
using STDentalLibrary.Models;
using STDentalLibrary.Models.ModelsResponse;
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
                    var helper = new EFHelperRepository(context);

                    if ((await helper.CheckContainServiceInTalons(serviceId)) == false) return false;

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

        public async Task<IEnumerable<Service>> GetServiceNamesAsync()
        {
            await using (var context = CreateContext())
            {
                return await context.Services
                    //.Include(a => a.ServiceCostCalculation)
                    .Where(q => q.EndDate == null)
                    .Where(w => w.ServiceCostCalculation.ServiceId == w.ServiceId)
                    .OrderBy(s => s.Shifr)
                    .ToListAsync();
            }
        }

        public async Task<Service> GetServiceAsync(int serviceId)
        {
            await using (var context = CreateContext())
            {
                return await context.Services
                    .Include(d => d.ServiceMaterials)
                    .Include(r => r.ServiceCostCalculation)
                    .Where(w => w.ServiceId == serviceId)
                    .FirstOrDefaultAsync();
            }
        }

        public async Task<bool> UpdateServiceAsync(int oldServiceId, Service service)
        {
            try
            {
                await using (var context = new STDentalContext())
                {
                    var helper = new EFHelperRepository(context);
                    
                    //обновить поле EndDate в таблице Services
                    if (!await helper.UpdateEndDateServices(oldServiceId, service.StartDate.AddDays(-1))) return false;

                    //сохранить service в Service, ServiceMaterial, ServiceCostCalculation
                    var res = await context.Services.AddAsync(service);

                    await context.SaveChangesAsync();

                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<ServiceMaterial>> GetServiceMaterialsAsync(int serviceId)
        {
            await using (var context = CreateContext())
            {
                return await context.ServiceMaterials
                    .Where(q => q.ServiceId == serviceId)
                    .OrderBy(s => s.Service.Name)
                    .ToListAsync();
            }
        }

        public async Task<IEnumerable<ServiceCostCalculation>> GetServiceCalculation(int serviceId)
        {
            await using (var context = CreateContext())
            {
                return await context.ServiceCostCalculations
                    .Where(q => q.Service.ServiceId == serviceId)
                    .ToListAsync();
            }
        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDentalDB"));
        }
    }
}
