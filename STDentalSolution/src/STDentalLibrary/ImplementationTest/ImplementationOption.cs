using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using STDentalLibrary.Context;
using STDentalLibrary.Models;
using STDentalLibrary.Repositories;

namespace STDentalLibrary.ImplementationTest
{
    public class ImplementationOption : IOptionRepository
    {
        private readonly STDentalContext _context;

        public ImplementationOption(STDentalContext context)
        {
            this._context = context;
        }

        public IEnumerable<Option> GetOptions()
        {
            return _context.Options;
        }

        public void SaveOptions(List<Option> listOption)
        {
            var curOption = _context.Options.ToList();

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
            }


            //foreach (var rowOption in listOption)
            //{
            //    _context.Entry(rowOption).State = EntityState.Modified;
            //}


            //_context.Entry(option).State = EntityState.Modified; 

            _context.SaveChanges();
        }
    }
}
