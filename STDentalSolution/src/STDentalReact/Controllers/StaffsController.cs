using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using STDentalLibrary.Models.ModelsResponse;
using STDentalLibrary.Repositories;

namespace STDentalReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StaffsController : ControllerBase
    {
        private readonly ILogger<StaffsController> _logger;
        private readonly IStaffRepository _staffRepository;

        public StaffsController(ILogger<StaffsController> logger, IStaffRepository staffRepository)
        {
            _logger = logger;
            _staffRepository = staffRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<DoctorComboBox>> GetAsync()
        {
            var doctors = await _staffRepository.GetFoundedStaffsInTalonsAsync();

            return doctors.Select(doctor => new DoctorComboBox()
                {
                    Id = doctor.StaffId.ToString(),
                    Name = doctor.Name
                })
                .ToArray();
        }
    }
}
