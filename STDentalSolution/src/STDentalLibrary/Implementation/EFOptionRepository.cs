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

        public async Task<string> GetOptionsJsonAsync()
        {
            await using var context = CreateContext();

            IList<Option> optionsList = await context.Options.ToListAsync();

            string json = string.Empty;
            await using (var stream = new MemoryStream())
            {
                await JsonSerializer.SerializeAsync(stream, optionsList, optionsList.GetType());
                stream.Position = 0;
                using var reader = new StreamReader(stream);
                json = await reader.ReadToEndAsync();
            }
            return json;
        }

        public async Task<string> GetOptionsUtf8JsonAsync()
        {
            await using var context = CreateContext();

            IList<Option> optionsList = await context.Options.ToListAsync();

            string json = string.Empty;
            await using (var stream = new MemoryStream())
            {
                await JsonSerializer.SerializeAsync(stream, optionsList, optionsList.GetType());
                stream.Position = 0;
                using var reader = new StreamReader(stream);
                json = await reader.ReadToEndAsync();
            }
            return json;
        }

        public async Task<IEnumerable<Option>> GetOptionsAsync()
        {
            await using var context = CreateContext();

            return await context.Options.ToListAsync();
        }

        public async Task<bool> SaveOptionsAsync(string stringJson)
        {
            await using var context = CreateContext();

            var newOptions = await JsonSerializer.DeserializeAsync<List<Option>>(new MemoryStream(Encoding.UTF8.GetBytes(stringJson)), null);

            if (newOptions == null) return false;
                
            var curOption = await context.Options.ToListAsync();
            
            if (curOption == null) return false;

            foreach (var row in curOption)
            {
                switch (row.Name)
                {
                    case "FullNameOrganization":
                        row.Value = newOptions
                            .Where(s => s.Name == "FullNameOrganization")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "NameOrganization":
                        row.Value = newOptions
                            .Where(s => s.Name == "NameOrganization")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "UNP":
                        row.Value = newOptions
                            .Where(s => s.Name == "UNP")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "LegalAddress":
                        row.Value = newOptions
                            .Where(s => s.Name == "LegalAddress")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "HeadFIO":
                        row.Value = newOptions
                            .Where(s => s.Name == "HeadFIO")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "HeadPost":
                        row.Value = newOptions
                            .Where(s => s.Name == "HeadPost")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "AccountantGeneral":
                        row.Value = newOptions
                            .Where(s => s.Name == "AccountantGeneral")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "BankName":
                        row.Value = newOptions
                            .Where(s => s.Name == "BankName")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "BankAccount":
                        row.Value = newOptions
                            .Where(s => s.Name == "BankAccount")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "BankAdress":
                        row.Value = newOptions
                            .Where(s => s.Name == "BankAdress")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                    case "BankSWIFT":
                        row.Value = newOptions
                            .Where(s => s.Name == "BankSWIFT")
                            .Select(w => w.Value)
                            .ToString()!;
                        break;
                }
            }

            await context.SaveChangesAsync();

            return true;
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
