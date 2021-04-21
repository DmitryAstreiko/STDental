﻿using System;
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
        Task<ResultOperation> RecountService(int serviceId);

        Task<IEnumerable<int>> GetListServicesContainMaterial(int materialId);

        Task<bool> UpdateEndDateServices(int serviceId, DateTime endDate);

        Task<bool> CheckContainServiceInTalons(int serviceId);

        Task<bool> CheckContainTalonInPayment(int talonId);

        Task<bool> CheckContainPatientInTalons(int patientId);

        Task<bool> CheckContainUnitInMaterialsServices(int unitId);

        Task<bool> CheckContainMaterialsInServices(int materialId);

        Task<bool> DeleteTalonServices(int talonId);

        Task<bool> DeleteGroupServices(int groupNameId);


    }
}
