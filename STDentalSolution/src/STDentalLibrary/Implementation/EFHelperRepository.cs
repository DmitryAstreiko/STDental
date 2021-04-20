using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using STDentalLibrary.Context;
using STDentalLibrary.Models.Enums;
using STDentalLibrary.Repositories;

namespace STDentalLibrary.Implementation
{
    public class EFHelperRepository : IHelperRepository
    {
        private readonly IConfiguration _configuration;

        public EFHelperRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Task<ResultOperation> RecountServices(List<int> listServiceId)
        {
            throw new NotImplementedException();
        }

        public Task<ResultOperation> ReplaceMaterial(int oldMaterialId, int newMaterialId)
        {
            throw new NotImplementedException();
        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDentalDB"));
        }
    }
}
