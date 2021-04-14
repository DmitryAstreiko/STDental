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
        IEnumerable<Material> GetAllMaterials();

        IEnumerable<Material> GetActualMaterials();

        IEnumerable<Material> SearchMaterials(string materialValue);

        int AddMaterial(Material material);

        bool UpdateMaterial(int materialId, string name, decimal price, DateTime endDate);

        bool DeleteMaterial(int materialId);

        void ExportToExcelMaterials(IEnumerable<Material> materials);
    }
}
