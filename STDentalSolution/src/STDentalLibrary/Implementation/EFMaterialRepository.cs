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
    public class EFMaterialRepository : IMaterialRepository
    {
        private readonly IConfiguration _configuration;

        public EFMaterialRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<int> AddMaterialAsync(Material material)
        {
            await using (var context = CreateContext())
            {
                var res = await context.Materials.AddAsync(material);
                return res.Entity.MaterialId;
            }
        }

        public async Task<bool> DeleteMaterialAsync(int materialId)
        {
            try
            {
                await using (var context = CreateContext())
                {
                    var delMaterial = await context.Materials.FindAsync(materialId);

                    if (delMaterial == null) return false;

                    context.Materials.Remove(delMaterial);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<Material>> GetActualMaterialsAsync()
        {
            await using (var context = CreateContext())
            {
                return await context.Materials
                    .Include(e => e.Unit)
                    .Where(q => q.EndDate == null)
                    .OrderBy(s => s.Name)
                    .ToListAsync();
            }
        }

        public async Task<IEnumerable<Material>> GetAllMaterialsAsync()
        {
            await using (var context = CreateContext())
            {
                return await context.Materials
                    .OrderBy(w => w.Name)
                    .ToListAsync();
            }
        }

        public async Task<bool> UpdateMaterialAsync(Material material)
        {
            try
            {
                await using var context = CreateContext();

                context.Materials.Attach(material);

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
