using STDentalLibrary.Context;
using STDentalLibrary.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Unicode;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using STDentalLibrary.Repositories;

namespace STDentalLibrary.Implementation
{
    public class EFOptionRepository : IOptionRepository
    {
        private readonly IConfiguration _configuration;

        public EFOptionRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<Option>> GetAsync()
        {
            await using var context = CreateContext();

            return await context.Options.ToListAsync();
        }

        public async Task UpdateOptionAsync(Option option)
        {
            await using (var context = CreateContext())
            {
                //context.Patients.Attach(patient);

                var oldOption = await context.Options.FindAsync(option.OptionsId);

                oldOption.Value = option.Value;

                context.Options.Update(oldOption);

                await context.SaveChangesAsync();
            }
        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDentalDB"));
        }

    }
}
