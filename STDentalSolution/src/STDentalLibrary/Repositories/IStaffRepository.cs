using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models;

namespace STDentalLibrary.Repositories
{
    public interface IStaffRepository
    {
        IEnumerable<Staff> GetActualStaffs();

        Staff GetStaff(int staffId);

        int AddStaff(Staff staff);

        int UpdateStaff(Staff staff);

        bool FireStaff(int staffId);
    }
}
