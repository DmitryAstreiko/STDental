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
        [ActionName("get")]
        public async Task<IEnumerable<TalonInfo>> GetAsync()
        {
            Console.WriteLine("GetAsync");

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
        [ActionName("gettalonsfilter")]
        public async Task<IEnumerable<TalonInfo>> TalonsFilterAsync(int? patientid, int? doctorid, DateTime? startdata, DateTime? enddata)
        {
            Console.WriteLine("TalonsFilterAsync");
            Console.WriteLine($"- {patientid}, - {doctorid}, - {startdata}, - {enddata}");

            var patientId = 5;
            var doctorId = 4;

            DateTime startDate;

            DateTime.TryParse("01.01.2021", out startDate);

            DateTime endDate;

            DateTime.TryParse("01.06.2021", out endDate);

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
