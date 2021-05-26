﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models;

namespace STDentalLibrary.Repositories
{
    public interface IPatientRepository
    {
        Task<IEnumerable<Patient>> GetPatientsAsync();

        Task<int> GetCountPatientsAsync();

        Task<IEnumerable<Patient>> GetPatientsComboAsync();

        Task<Patient> GetPatientAsync(int patientId);

        //Task<IEnumerable<Patient>> SearchPatientsAsync(string nameValue);

        Task<int> AddPatientAsync(Patient patient);

        Task<bool> UpdatePatientAsync(Patient patient);

        Task<bool> DeletePatientAsync(int patientId);
    }
}
