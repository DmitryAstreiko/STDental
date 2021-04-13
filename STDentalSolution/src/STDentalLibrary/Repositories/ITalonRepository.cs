using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models;

namespace STDentalLibrary.Repositories
{
    public interface ITalonRepository
    {
        //Get all talons
        IEnumerable<Talon> GeTalons();

        //Get the services included in the selected talon 
        IEnumerable<TalonService> GetTalonServices(int talonId);

        Talon GetTalon(int talonId);

        int AddTalon(int patientId, int staffId, List<ServiceMaterial> listServiceMaterials);

        bool UpdateTalon(int talonId, int patientId, int staffId, List<ServiceMaterial> listServiceMaterials);

        bool DeleteTalon(int talonId);

        void ExportToExcelTalon(int talonId);

        int AddPayment(Payment payment);
    }
}
