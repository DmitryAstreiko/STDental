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

        [HttpGet("service")]
        public async Task<IEnumerable<ServiceAction>> GetServiceAsync(int serviceId)
        {
            var service = await _serviceRepository.GetServiceAsync(serviceId);

            return service.Select(serv => new ServiceAction()
                {
                    Id = serv.ServiceId.ToString(),
                    Name = serv.Name,
                    Shifr = serv.Shifr,
                    Price = serv.ServiceCostCalculation.Cost.ToString(),
                    Amount = "1",
                    Cost = serv.ServiceCostCalculation.Cost.ToString()
                })
                .ToArray();
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
