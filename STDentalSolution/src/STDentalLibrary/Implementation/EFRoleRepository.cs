using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;
using STDentalLibrary.Context;
using STDentalLibrary.Models.Enums;
using STDentalLibrary.Repositories;

namespace STDentalLibrary.Implementation
{
    public class EFRoleRepository : IRoleRepository
    {
        private readonly IConfiguration _configuration;

        public EFRoleRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Task<IEnumerable<Role>> GetRolesAsync()
        {
            throw new NotImplementedException();
        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDentalDB"));
        }
    }
}
