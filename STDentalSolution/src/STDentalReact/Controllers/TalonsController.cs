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
        }

        [HttpGet("filter")]
        public async Task<IEnumerable<TalonInfo>> TalonsFilterAsync(int? patientId, int? doctorId, DateTime? startDate, DateTime? endDate)
        {
            Console.WriteLine("TalonsFilterAsync");
            Console.WriteLine($"- {patientId}, - {doctorId}, - {startDate}, - {endDate}");

            Console.WriteLine("go to GeTalonsFilterAsync");
            Console.WriteLine($"patientid = {patientId.ToString()}");
            Console.WriteLine($"doctorid = {doctorId.ToString()}");
            Console.WriteLine($"startdata = {startDate.ToString()}");
            Console.WriteLine($"enddata = {endDate.ToString()}");

            ////////////////////////////////////////////////
            /*if (int.TryParse(context.Request.Query["id"], out var serviceId))
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
                   }*/
            //////////////////////////////////////////////////////// 

            var talons = await _talonRepository.GetTalonsFilterAsync(patientId, doctorId, startDate, endDate);

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
