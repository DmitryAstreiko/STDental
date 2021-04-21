using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models.Enums;

namespace STDentalLibrary.Repositories
{
    public interface IHelperRepository
    {
        //при изменении материала, необходимо подставить новый материал вместо старого и пересчитать прейскурант, где использовался старый материал
        Task<ResultOperation> ReplaceMaterial(int oldMaterialId, int newMaterialId);

        //пересчет определенных прейскурантов
        Task<ResultOperation> RecountServices(List<int> listServiceId);

        Task<bool> UpdateEndDateServices(int serviceId, DateTime endDate);

        Task<bool> CheckContainServiceInTalons(int serviceId);
    }
}
