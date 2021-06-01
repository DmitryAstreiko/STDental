using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using STDentalLibrary.Context;
using STDentalLibrary.Models;
using STDentalLibrary.Models.Enums;
using STDentalLibrary.Repositories;

namespace STDentalLibrary.Implementation
{
    public class EFHelper: IHelper
    {
        private readonly IConfiguration _configuration;

        public EFHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<int> CheckContainPatientInTalon(int patientId)
        {
            await using (var context = CreateContext())
            {
                return await context.Talons
                    .Where(w => w.PatientId == patientId)
                    .CountAsync();
            }
        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDental"));
        }
    }
}

