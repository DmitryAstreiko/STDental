﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using STDentalLibrary.Models;
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

        [HttpGet]
        public async Task<IEnumerable<PatientComboBox>> GetAsync()
        {
            var patients = await _patientRepository.GetPatientsAsync();

            return patients.Select(patient => new PatientComboBox()
                {
                    Id = patient.PatientId.ToString(),
                    Name = patient.Name
                })
                .ToArray();
        }
    }
}
