using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models;
using STDentalLibrary.Models.ModelsResponse;

namespace STDentalLibrary.Repositories
{
    public interface IServiceRepository
    {
        //Get actual services (for example combobox)
        Task<IEnumerable<Service>> GetActualServicesAsync();

        //Get all services (for example tree view)
        Task<IEnumerable<Service>> GetServicesAsync();

        Task<IEnumerable<Service>> GetServicesComboAsync();

        Task<Service> GetServiceAsync(int serviceId);

        Task<IEnumerable<ServiceMaterial>> GetServiceMaterialsAsync(int serviceId);

        Task<IEnumerable<ServiceCostCalculation>> GetServiceCalculation(int serviceId);

        Task<int> AddServiceAsync(Service service);

        Task<bool> UpdateServiceAsync(int oldServiceId, Service service);

        Task<bool> DeleteServiceAsync(int serviceId);
    }
}
