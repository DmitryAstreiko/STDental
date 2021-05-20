using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models;
using STDentalLibrary.Models.ModelsResponse;

namespace STDentalLibrary.Repositories
{
    public interface ITalonRepository
    {
        //Get all talons
        Task<IEnumerable<Talon>> GetTalonsAsync(int page, int itemsPerPage);

        Task<int> GetCountTalonsAsync(int? patientId, int? doctorId, DateTime? startDate, DateTime? endDate);

        Task<IEnumerable<Talon>> GetTalonsFilterAsync(int page, int itemsPerPage, int? patientId, int? doctorId, DateTime? startDate, DateTime? endDate);

        //Get the services included in the selected talon 
        Task<IEnumerable<TalonService>> GetTalonServicesAsync(int talonId);

        Task<Talon> GetTalonAsync(int talonId);

        Task<int> AddTalonAsync(Talon talon);

        Task<bool> UpdateTalonAsync(Talon talon);

        Task<bool> DeleteTalonAsync(int talonId);
        
        Task<int> AddPaymentAsync(Payment payment);
    }
}
