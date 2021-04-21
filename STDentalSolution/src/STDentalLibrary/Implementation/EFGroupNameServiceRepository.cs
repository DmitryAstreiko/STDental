using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using STDentalLibrary.Context;
using STDentalLibrary.Models;
using STDentalLibrary.Repositories;

namespace STDentalLibrary.Implementation
{
    public class EFGroupNameServiceRepository : IGroupNameServiceRepository
    {
        private readonly IConfiguration _configuration;

        public EFGroupNameServiceRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<int> AddGroupAsync(GroupNameService groupName)
        {

            await using (var context = CreateContext())
            {
                var res = await context.GroupNameServices.AddAsync(groupName);
                await context.SaveChangesAsync();
                return res.Entity.GroupNameId;
            }
        }

        public async Task<bool> DelGroupAsync(int groupNameId)
        {
            try
            {
                await using (var context = CreateContext())
                {
                    var delGroup = await context.GroupNameServices.FindAsync(groupNameId);
                    context.GroupNameServices.Remove(delGroup);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<GroupNameService>> GetGroupAsync()
        {
            await using (var context = CreateContext())
            {
                return await context.GroupNameServices
                    .OrderBy(s => s.Name)
                    .ToListAsync();
            }
        }

        public async Task<IEnumerable<GroupService>> GetGroupServicesAsync(int groupNameId)
        {
            await using (var context = CreateContext())
            {
                return await context.GroupServices
                    .Where(w => w.GroupNameId == groupNameId)
                    .OrderBy(s => s.Service.Name)
                    .ToListAsync();
            }
        }

        public async Task<bool> UpdateGroupAsync(GroupNameService groupName)
        {
            try
            {
                await using (var context = CreateContext())
                {
                    var helper = new EFHelperRepository(context);

                    if (await helper.DeleteGroupServices(groupName.GroupNameId)) return false;

                    context.GroupNameServices.Attach(groupName);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        private STDentalContext CreateContext()
        {
            return new STDentalContext(_configuration.GetConnectionString("STDentalDB"));
        }
    }
}
