using System;
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
    public class ServicesController : ControllerBase
    {
        private readonly ILogger<ServicesController> _logger;
        private readonly IServiceRepository _serviceRepository;

        public ServicesController(ILogger<ServicesController> logger, IServiceRepository serviceRepository)
        {
            _logger = logger;
            _serviceRepository = serviceRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Service>> GetAsync()
        {
            return await _serviceRepository.GetServicesAsync();
        }

       /* [HttpGet("comboservices")]
        public async Task<IEnumerable<TalonInfo>> GetServicesComboAsync()
        {
            var talons = await _serviceRepository.GetServicesAsync()

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

    }
}
