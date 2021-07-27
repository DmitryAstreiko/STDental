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

        public async Task<bool> SaveAsync(List<Option> options)
        {
            try
            {
                await using var context = CreateContext();

                foreach (var option in options)
                {
                    context.Options.Attach(option);
                }

                await context.SaveChangesAsync();

                return true;
            }
            catch 
            {
                return false;
            }
        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDentalDB"));
        }

    }
}
