using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models;

namespace STDentalLibrary.Repositories
{
    public interface IUnitRepository
    {
        Task<IEnumerable<Unit>> GetUnitsAsync();

        Task<int> AddUnitAsync(Unit unit);

        Task<bool> UpdateUnitAsync(Unit unit);

        Task<bool> DeleteUnitAsync(int unitId);
    }
}
