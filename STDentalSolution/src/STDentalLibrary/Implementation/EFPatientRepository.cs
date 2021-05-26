using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public async Task<int> AddPatientAsync(Patient patient)
        {
            await using (var context = CreateContext())
            {
                var res = await context.Patients.AddAsync(patient);
                return res.Entity.PatientId;
            }
        }
        
        public async Task<bool> DeletePatientAsync(int patientId)
        {
            try
            {
                await using (var context = CreateContext())
                {
                    var helper = new EFHelperRepository(context);

                    if (await helper.CheckContainPatientInTalons(patientId)) return false;

                    var delPatient = await context.Patients.FindAsync(patientId);

                    if (delPatient == null) return false;

                    context.Patients.Remove(delPatient);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public async Task<Patient> GetPatientAsync(int patientId)
        {
            await using (var context = CreateContext())
            {
                return await context.Patients
                    .Where(w => w.PatientId == patientId)
                    .FirstAsync();
            }
        }

        public async Task<IEnumerable<Patient>> GetPatientsComboAsync()
        {
            await using (var context = CreateContext())
            {
                return await context.Patients
                    .OrderBy(w => w.Name)
                    .ToListAsync();
            }
        }

        public async Task<int> GetCountPatientsAsync()
        {
            await using (var context = CreateContext())
            {
                return await context.Patients.CountAsync();
            }
        }

        public async Task<IEnumerable<Patient>> GetPatientsAsync()
        {
            await using (var context = CreateContext())
            {
                return await context.Patients
                    .OrderBy(w => w.Name)
                    .ToListAsync();
            }
        }

        public async Task<bool> UpdatePatientAsync(Patient patient)
        {
            try
            {
                await using var context = CreateContext();

                context.Patients.Attach(patient);

                await context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDental"));
        }
    }
}
