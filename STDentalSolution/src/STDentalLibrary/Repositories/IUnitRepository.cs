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
        IEnumerable<Unit> GetUnits();

        int AddUnit(string name);

        bool UpdateUnit(int unitId, string name);

        bool DeleteUnit(int unitId);
    }
}
