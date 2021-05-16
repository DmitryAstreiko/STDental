using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models;
using STDentalLibrary.Models.ModelsResponse;

namespace STDentalLibrary.Repositories
{
    public interface IStaffRepository
    {
        Task<IEnumerable<Staff>> GetActualStaffsAsync();

        Task<IEnumerable<DoctorComboBox>> GetFoundedStaffsInTalonsAsync();

        Task<Staff> GetStaffAsync(int staffId);

        Task<int> AddStaffAsync(Staff staff);

        Task<bool> UpdateStaffAsync(Staff staff);

        Task<bool> FireStaffAsync(int staffId);
    }
}
