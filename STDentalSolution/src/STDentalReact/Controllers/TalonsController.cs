using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Infrastructure;
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
        
        [HttpGet("count")]
        public async Task<int> GetCountTalonsAsync(int? patientId, int? doctorId, DateTime? startDate, DateTime? endDate)
        {
            return await _talonRepository.GetCountTalonsAsync(patientId, doctorId, startDate, endDate);
        }

        [HttpGet("services")]
        public async Task<IEnumerable<TalonServicesInfo>> GetTalonServicesAsync(int talonId)
        {
            var talonServicesList = await _talonRepository.GetTalonServicesAsync(talonId);

            return talonServicesList.Select(service => new TalonServicesInfo()
                {
                    Id = service.TalonServiceId,
                    Shifr = service.Service.Shifr,
                    ServiceName = service.Service.Name,
                    Cost = service.Cost,
                    Amount = service.Amount,
                    Price = service.Price
                })
                .ToArray();
        }

        [HttpGet]
        public async Task<IEnumerable<TalonInfo>> TalonsFilterAsync(int page, int itemsPerPage, int? patientId, int? doctorId, DateTime? startDate, DateTime? endDate)
        {
            var talons = await _talonRepository.GetTalonsFilterAsync(page, itemsPerPage, patientId, doctorId, startDate, endDate);

            return talons.Select(talon => new TalonInfo()
                {
                    TalonId = talon.TalonId,
                    PatientName = talon.Patient.Name,
                    StaffName = talon.Staff.Name,
                    Summa = talon.Summa,
                    Cost = talon.Cost,
                    CreateDate = talon.CreateDate,
                    TalonStatus = talon.PaymentStatus.ToString(),
                    Description = talon.Description
                })
                .ToArray();
        }

        [HttpPost("addtalon")]
        public async Task<int> AddTalonAsync([FromBody] Talon talon)
        {
            try
            {
                return await _talonRepository.AddTalonAsync(talon);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Talon didn`t add. Detail: {e.StackTrace}");
                return 0;
            }
        }

        [HttpDelete("delete")]
        public async Task<bool> DeleteTalonAsync(int talonId)
        {
            try
            {
                return await _talonRepository.DeleteTalonAsync(talonId);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Talon didn`t add. Detail: {e.StackTrace}");
                return false;
            }
        }

    }
}
