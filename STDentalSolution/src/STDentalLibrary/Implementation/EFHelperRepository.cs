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
        private readonly STDentalContext _context;

        public EFHelperRepository(STDentalContext context)
        {
            _context = context;
        }

        public Task<ResultOperation> RecountServices(List<int> listServiceId)
        {
            throw new NotImplementedException();
        }

        public Task<ResultOperation> ReplaceMaterial(int oldMaterialId, int newMaterialId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateEndDateServices(int serviceId, DateTime endDate)
        {
            throw new NotImplementedException();
        }

        public Task<bool> CheckContainServiceInTalons(int serviceId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> CheckContainTalonInPayment(int talonId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteTalonServices(int talonId)
        {
            throw new NotImplementedException();
        }
    }
}
