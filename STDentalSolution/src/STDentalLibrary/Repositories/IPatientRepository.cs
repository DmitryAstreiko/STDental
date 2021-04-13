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
        IEnumerable<Patient> GetPatients();

        Patient GetPatient(int patientId);

        IEnumerable<Patient> SearchPatients(string nameValue);

        int AddPatient(Patient patient);

        int UpdatePatient(Patient patient);

        bool DeletePatient(int patientId);
    }
}
