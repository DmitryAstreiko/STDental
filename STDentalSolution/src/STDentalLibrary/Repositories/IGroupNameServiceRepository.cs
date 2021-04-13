using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models;

namespace STDentalLibrary.Repositories
{
    public interface IGroupNameServiceRepository
    {
        IEnumerable<GroupNameService> GetGroupNameServices();

        IEnumerable<GroupService> GetGroupServices(int groupNameId);

        int AddGrouppingNameService(string groupNameValue, GroupService groupService);

        bool UpdateGrouppingNameService(int groupNameId, string groupNameValue, GroupService groupService);

        bool DeleteGrouppingNameService(int groupNameId);
    }
}
