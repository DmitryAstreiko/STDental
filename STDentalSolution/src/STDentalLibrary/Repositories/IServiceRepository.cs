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
        IEnumerable<Service> GetActualServices();

        //Get all services (for example tree view)
        IEnumerable<Service> GetServices();

        int AddService(Service service, ServiceMaterial serviceMaterial, ServiceCostCalculation serviceCostCalculation);

        bool UpdateService(Service service, ServiceMaterial serviceMaterial, ServiceCostCalculation serviceCostCalculation);

        bool DeleteService(int serviceId);

        void ExportToExcelServices();
    }
}
