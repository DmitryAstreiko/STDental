using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models;

namespace STDentalLibrary.Repositories
{
    public interface IMaterialRepository
    {
        Task<IEnumerable<Material>> GetAllMaterialsAsync();

        Task<IEnumerable<Material>> GetActualMaterialsAsync();

        //Task<IEnumerable<Material>> SearchMaterialsAsync(string materialValue);

        Task<int> AddMaterialAsync(Material material);

        Task<bool> UpdateMaterialAsync(Material material);

        Task<bool> DeleteMaterialAsync(int materialId);
    }
}
