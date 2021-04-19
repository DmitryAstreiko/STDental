using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using STDentalLibrary.Context;
using STDentalLibrary.Models;
using STDentalLibrary.Repositories;

namespace STDentalLibrary.Implementation
{
    public class EFUnitRepository : IUnitRepository
    {
        private readonly IConfiguration _configuration;

        public EFUnitRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<int> AddUnitAsync(Unit unit)
        {
            await using (var context = CreateContext())
            {
                var res = await context.Units.AddAsync(unit);
                return res.Entity.UnitId;
            }
        }

        public async Task<bool> DeleteUnitAsync(int unitId)
        {
            try
            {
                await using (var context = CreateContext())
                {
                    var delUnit = await context.Units.FindAsync(unitId);

                    if (delUnit == null) return false;

                    context.Units.Remove(delUnit);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<Unit>> GetUnitsAsync()
        {
            await using (var context = CreateContext())
            {
                return await context.Units
                    .OrderBy(w => w.Name)
                    .ToListAsync();
            }
        }

        public async Task<bool> UpdateUnitAsync(Unit unit)
        {
            try
            {
                await using (var context = CreateContext())
                {
                    context.Units.Attach(unit);

                    await context.SaveChangesAsync();

                    return true;
                }
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
