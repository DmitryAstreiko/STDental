using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models.Enums;

namespace STDentalLibrary.Repositories
{
    public interface IRoleRepository
    {
        IEnumerable<Role> GetRoles();
        
    }
}
