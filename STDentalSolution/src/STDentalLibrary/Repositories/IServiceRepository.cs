using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models;

namespace STDentalLibrary.Repositories
{
    public interface IServiceRepository
    {
        //Get actual services (for example combobox)
        Task<IEnumerable<Service>> GetActualServicesAsync();

        //Get all services (for example tree view)
        Task<IEnumerable<Service>> GetServicesAsync();

        Task<int> AddServiceAsync(Service service);

        Task<bool> UpdateServiceAsync(Service service);

        Task<bool> DeleteServiceAsync(int serviceId);
    }
}
