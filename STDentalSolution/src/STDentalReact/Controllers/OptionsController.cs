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
    public class OptionsController : ControllerBase
    {
        private readonly ILogger<OptionsController> _logger;
        private readonly IOptionRepository _optionsRepository;
        private readonly IHelper _helper;

        public OptionsController(ILogger<OptionsController> logger, IOptionRepository optionsRepository, IHelper helper)
        {
            _logger = logger;
            _optionsRepository = optionsRepository;
            _helper = helper;
        }

        [HttpGet]
        public async Task<IEnumerable<OptionsInfo>> GetAsync()
        {
            var options = await _optionsRepository.GetAsync();

            return options.Select(option => new OptionsInfo()
                {
                    OptionsId = option.OptionsId,
                    Name = option.Name,
                    Value = option.Value,
                    Description = option.Description
                })
                .ToArray();
        }

        [HttpPut]
        public async Task<IActionResult> PutOptionAsync([FromBody] Option option)
        {
            try
            {
                await _optionsRepository.UpdateOptionAsync(option);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
