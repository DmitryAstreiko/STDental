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
        Task<IEnumerable<Option>> GetAsync();

        Task UpdateOptionAsync(Option option);
    }
}
