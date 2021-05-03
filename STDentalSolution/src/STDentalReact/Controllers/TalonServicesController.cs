using Microsoft.AspNetCore.Http;
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
   /* [ApiController]
    [Route("[controller]")]
    public class TalonServicesController : ControllerBase
    {
        private readonly ILogger<TalonServicesController> _logger;
        private readonly ITalonRepository _talonRepository;

        public TalonServicesController(ILogger<TalonServicesController> logger, ITalonRepository talonRepository)
        {
            _logger = logger;
            _talonRepository = talonRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<TalonService>> GetAsync()
        {
            var talonServices = await _talonRepository.GetTalonServicesAsync();

            return talonServices.Select(talonService => new TalonServicesView()
                {
                    TalonServiceId = talonService.TalonServiceId.ToString(),
                    ServiceName = talonService.Service.Name,
                    Price = talonService.Price.ToString(),
                    Amount = talonService.Amount.ToString(),
                    Cost = talonService.Cost.ToString()
                })
                .ToArray();
        }
    }*/
}
