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

        [HttpGet]
        public async Task<IEnumerable<TalonInfo>> GetAsync()
        {
            var talons = await _talonRepository.GetTalonsAsync();

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

        [HttpGet]
        [ActionName("filters")]
        public async Task<IEnumerable<TalonInfo>> GetTalonsFilterAsync(int patientid, int doctorid, DateTime startdata, DateTime enddata)
        {
            Console.WriteLine("go to GeTalonsFilterAsync");
            
            /*
             if (int.TryParse(context.Request.Query["id"], out var serviceId))
                    {
                        var repository = context.RequestServices.GetService<IServiceRepository>();
                        var serviceList = await repository.GetServiceMaterialsAsync(serviceId);

                        var options = new JsonSerializerOptions()
                        {
                            ReferenceHandler = ReferenceHandler.Preserve
                        };

                        await context.Response.WriteAsync(JsonSerializer.Serialize(serviceList, options));
                    }
                    else
                    {
                        await context.Response.WriteAsync("False");
                    }
             */

            var talons = await _talonRepository.GetTalonsFilterAsync(patientid, doctorid, startdata, enddata);

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
    }
}
