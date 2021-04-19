using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using STDentalLibrary.Context;
using STDentalLibrary.Models;
using STDentalLibrary.Repositories;

namespace STDentalLibrary.Implementation
{
    public class EFPatientRepository : IPatientRepository
    {
        private readonly IConfiguration _configuration;

        public EFPatientRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IEnumerable<Patient> GetPatients()
        {
            throw new NotImplementedException();
        }

        public Patient GetPatient(int patientId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Patient> SearchPatients(string nameValue)
        {
            throw new NotImplementedException();
        }

        public int AddPatient(Patient patient)
        {
            throw new NotImplementedException();
        }

        public bool UpdatePatient(Patient patient)
        {
            throw new NotImplementedException();
        }

        public bool DeletePatient(int patientId)
        {
            throw new NotImplementedException();
        }

        public STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDentalDB"));
        }
    }
}
