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
        Task<IEnumerable<GroupNameService>> GetGroupAsync();

        Task<IEnumerable<GroupService>> GetGroupServicesAsync(int groupNameId);

        Task<int> AddGroupAsync(GroupNameService groupName);

        Task<bool> DelGroupAsync(int groupNameId);

        Task<bool> UpdateGroupAsync(GroupNameService groupService);
    }
}
