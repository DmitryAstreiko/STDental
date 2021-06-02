using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models;

namespace STDentalLibrary.Repositories
{
    public interface IPatientRepository
    {
        Task<IEnumerable<Patient>> GetPatientsAsync(int page, int itemsPerPage, string? fioSearch);

        Task<int> GetCountPatientsAsync(string? fioSearch);

        Task<IEnumerable<Patient>> GetPatientNamesAsync();

        Task<Patient> GetPatientAsync(int patientId);

        //Task<IEnumerable<Patient>> SearchPatientsAsync(string nameValue);

        Task<int> AddPatientAsync(Patient patient);

        Task UpdatePatientAsync(Patient patient);

        Task DeletePatientAsync(int patientId);
    }
}
