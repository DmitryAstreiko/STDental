using System;
using System.Collections.Generic;
using System.Globalization;
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

        [HttpGet("service")]
        public async Task<ServiceAction> GetServiceAsync(int serviceId)
        {
            var service = await _serviceRepository.GetServiceAsync(serviceId);

            return new ServiceAction()
                {
                    Id = service.ServiceId,
                    Name = service.Name,
                    Shifr = service.Shifr,
                    Price = service.ServiceCostCalculation?.Cost,
                    Amount = 1,
                    Cost = service.ServiceCostCalculation?.Cost
                };
        }

        [HttpGet("comboservices")]
        public async Task<IEnumerable<ServiceComboBox>> GetServicesComboAsync()
        {
            var services = await _serviceRepository.GetServicesComboAsync();

            return services.Select(service => new ServiceComboBox()
            {
                Id = service.ServiceId.ToString(),
                Name = $"{service.Shifr} {service.Name}"
            })
                .ToArray();
        }

    }
}
