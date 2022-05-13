using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using STDentalLibrary.Context;
using STDentalLibrary.Models;
using STDentalLibrary.Models.Enums;
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
                await context.SaveChangesAsync();
                return res.Entity.PatientId;
            }
        }
        
        public async Task DeletePatientAsync(int patientId)
        {
            await using (var context = CreateContext())
            {
                var delPatient = await context.Patients.FindAsync(patientId);

                context.Patients.Remove(delPatient);
                await context.SaveChangesAsync();
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

        public async Task<IEnumerable<Patient>> GetPatientNamesAsync()
        {
            await using (var context = CreateContext())
            {
                return await context.Patients
                    .OrderBy(w => w.Name)
                    .ToListAsync();
            }
        }

        public async Task<int> GetCountPatientsAsync(string fioSearch)
        {
            await using (var context = CreateContext())
            {
                var query = context.Patients.AsQueryable();

                if (fioSearch != null)
                {
                    query = query.Where(a => a.Name.ToLower().StartsWith(fioSearch.ToLower()));
                }

                return await query.CountAsync();
            }
        }

        public async Task<IEnumerable<Patient>> GetPatientsAsync(int page, int itemsPerPage, string fioSearch)
        {
            await using (var context = CreateContext())
            {
                var query = context.Patients                    
                    .AsQueryable();

               if (fioSearch != null)
                {
                    query = query.Where(a => a.Name.ToLower().StartsWith(fioSearch.ToLower()));
                }

                return await query.OrderBy(w => w.Name)
                    .Skip((page - 1) * itemsPerPage)
                    .Take(itemsPerPage)
                    .ToListAsync();
            }
        }

        public async Task UpdatePatientAsync(Patient patient)
        {
            await using (var context = CreateContext())
            {
                //context.Patients.Attach(patient);

                var oldPatient = await context.Patients.FindAsync(patient.PatientId);

                oldPatient.Name = patient.Name;
                oldPatient.City = patient.City;
                oldPatient.Street = patient.Street;
                oldPatient.Phone = patient.Phone;
                oldPatient.DateBorn = patient.DateBorn;
                oldPatient.Description = patient.Description;
                oldPatient.Nationality = ((int) patient.Nationality == 1) ? Nationality.BY : Nationality.Other;

                context.Patients.Update(oldPatient);

                await context.SaveChangesAsync();
            }
        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDental"));
        }
    }
}
