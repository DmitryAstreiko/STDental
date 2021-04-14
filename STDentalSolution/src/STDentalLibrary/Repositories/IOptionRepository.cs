using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models;

namespace STDentalLibrary.Repositories
{
    public interface IOptionRepository
    {
        IEnumerable<Option> GetOptions();

        void SaveOptions(List<Option> listOption);
    }
}
