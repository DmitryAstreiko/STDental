﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using STDentalLibrary.Models;
using STDentalLibrary.Models.ModelsResponse;
using STDentalLibrary.Repositories;

namespace STDentalReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TalonsController : ControllerBase
    {
        private readonly ILogger<TalonsController> _logger;
        private readonly ITalonRepository _talonRepository;

        public TalonsController(ILogger<TalonsController> logger, ITalonRepository talonRepository)
        {
            _logger = logger;
            _talonRepository = talonRepository;
        }

        /*[HttpGet]
        public async Task<IEnumerable<TalonInfo>> GetAsync(int page, int itemsPerPage)
        {
            Console.WriteLine("GetAsync");

            var talons = await _talonRepository.GetTalonsAsync(page, itemsPerPage);

            return talons.Select(talon => new TalonInfo()
                {
                    TalonId = talon.TalonId.ToString(),
                    PatientName = talon.Patient.Name,
                    StaffName = talon.Staff.Name,
                    Summa = talon.Summa.ToString(),
                    Cost = talon.Cost.ToString(),
                    CreateDate = talon.CreateDate.ToString("dd.MM.yyyy"),
                    TalonStatus = talon.PaymentStatus.ToString(),
                    Description = talon.Description
                })
                .ToArray();
        }*/

        [HttpGet("count")]
        public async Task<int> GetCountTalonsAsync(int? patientId, int? doctorId, DateTime? startDate, DateTime? endDate)
        {
            return await _talonRepository.GetCountTalonsAsync(patientId, doctorId, startDate, endDate);
        }

        //[HttpGet("filter")]
        [HttpGet]
        public async Task<IEnumerable<TalonInfo>> TalonsFilterAsync(int page, int itemsPerPage, int? patientId, int? doctorId, DateTime? startDate, DateTime? endDate)
        {
            //DateTime www;
            //Console.WriteLine(startDate.ToString());
            //DateTime.TryParse(startDate, out www);

            var talons = await _talonRepository.GetTalonsFilterAsync(page, itemsPerPage, patientId, doctorId, startDate, endDate);

            return talons.Select(talon => new TalonInfo()
                {
                    TalonId = talon.TalonId.ToString(),
                    PatientName = talon.Patient.Name,
                    StaffName = talon.Staff.Name,
                    Summa = talon.Summa.ToString(),
                    Cost = talon.Cost.ToString(),
                    CreateDate = talon.CreateDate.ToString("dd.MM.yyyy"),
                    TalonStatus = talon.PaymentStatus.ToString(),
                    Description = talon.Description
                })
                .ToArray();
        }

        [HttpPost("addtalon")]
        public async Task<int> AddTalonAsync()
        {
            try
            {
                var www = Response.Body;
                

                //return await _talonRepository.AddTalonAsync(www);
                return 1;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Talon didn`t add. Detail: {e.StackTrace}");
                return 0;
            }
           
        }

    }
}
