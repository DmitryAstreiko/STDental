using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using STDentalLibrary.Models;
using STDentalLibrary.Models.Enums;
using STDentalLibrary.Models.ModelsResponse;
using STDentalLibrary.Repositories;

namespace STDentalReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly ILogger<PatientsController> _logger;
        private readonly IPatientRepository _patientRepository;

        public PatientsController(ILogger<PatientsController> logger, IPatientRepository patientRepository)
        {
            _logger = logger;
            _patientRepository = patientRepository;
        }

        [HttpGet("patientNames")]
        public async Task<IEnumerable<PatientNames>> GetNamesAsync()
        {
            var patients = await _patientRepository.GetPatientNamesAsync();

            return patients.Select(patient => new PatientNames()
                {
                    Id = patient.PatientId.ToString(),
                    Name = patient.Name
                })
                .ToArray();
        }

        [HttpGet]
        public async Task<IEnumerable<PatientInfo>> GetAsync(int page, int itemsPerPage, string fioSearch)
        {
            var patients = await _patientRepository.GetPatientsAsync(page, itemsPerPage, fioSearch);

            return patients.Select(patient => new PatientInfo()
                {
                    Id = patient.PatientId,
                    Name = patient.Name,
                    City = patient.City,
                    Street = patient.Street,
                    DateBorn = patient.DateBorn,
                    Phone = patient.Phone,
                    Nationality = patient.Nationality.ToString(),
                    Desription = patient.Description
                })
                .ToArray();
        }

        [HttpGet("count")]
        public async Task<int> GetCountPatientsAsync(string fioSearch)
        {
            return await _patientRepository.GetCountPatientsAsync(fioSearch);
        }

        [HttpPost]
        public async Task<IActionResult> PostPatientAsync([FromBody] Patient patient)
        {
            try
            {
                await _patientRepository.AddPatientAsync(patient);
                return Ok();
            }
            catch 
            {
                return BadRequest();
            }
        }
    }
}
