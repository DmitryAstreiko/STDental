using STDentalLibrary.Context;
using STDentalLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public async Task<IEnumerable<Option>> GetOptionsAsync()
        {
            await using var context = CreateContext(); 
            return await context.Options.ToListAsync();
        }

        public void SaveOptions(List<Option> listOption)
        {
            using var context = CreateContext();
            var curOption = context.Options.ToList();
            /*
            foreach (var row in curOption)
            {
                switch (row.Name)
                {
                    case "FullNameOrganization":
                        row.Value = listOption
                            .Where(s => s.Name == "FullNameOrganization")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "NameOrganization":
                        row.Value = listOption
                            .Where(s => s.Name == "NameOrganization")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "UNP":
                        row.Value = listOption
                            .Where(s => s.Name == "UNP")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "LegalAddress":
                        row.Value = listOption
                            .Where(s => s.Name == "LegalAddress")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "PhysicalAddress":
                        row.Value = listOption
                            .Where(s => s.Name == "PhysicalAddress")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    // etc
                }
            */
           

        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDentalDB"));
        }


        //foreach (var rowOption in listOption)
        //{
        //    _context.Entry(rowOption).State = EntityState.Modified;
        //}


        //_context.Entry(option).State = EntityState.Modified; 

        //_context.SaveChanges();



    }
}
