using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using STDentalLibrary.Context;
using STDentalLibrary.Models;
using STDentalLibrary.Models.Enums;
using STDentalLibrary.Repositories;

namespace STDentalLibrary.Implementation
{
    public class EFReceptionRepository : IReceptionRepository
    {
        private readonly IConfiguration _configuration;

        public EFReceptionRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<int> AddReceptionAsync(Reception reception)
        {
            await using (var context = CreateContext())
            {
                var res = await context.Receptions.AddAsync(reception);
                await context.SaveChangesAsync();
                return res.Entity.ReceptionId;
            }
        }

        public async Task<IEnumerable<Reception>> GetReceptionsAsync(DateTime startDate, DateTime endDate)
        {
            await using var context = CreateContext();

            return await context.Receptions
                .Where(s => s.VisitDay >= startDate && s.VisitDay <= endDate)
                .OrderBy(e => e.VisitDay)
                .ThenBy(w => w.StartTime)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reception>> GetReceptionsAsync(DateTime startDate, DateTime endDate, int staffId)
        {
            await using var context = CreateContext();

            return await context.Receptions
                .Where(s => s.VisitDay >= startDate && s.VisitDay <= endDate && s.StaffId == staffId)
                .OrderBy(e => e.VisitDay)
                .ThenBy(w => w.StartTime)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reception>> GetReceptionsAsync(DateTime startDate, DateTime endDate, ReceptionStatus status)
        {
            await using var context = CreateContext();

            return await context.Receptions
                .Where(s => s.VisitDay >= startDate && s.VisitDay <= endDate && s.ReceptionStatus == status)
                .OrderBy(e => e.VisitDay)
                .ThenBy(w => w.StartTime)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reception>> GetReceptionsAsync(DateTime visitedDate)
        {
            await using var context = CreateContext();

            return await context.Receptions
                .Where(s => s.VisitDay == visitedDate)
                .OrderBy(e => e.StartTime)
                .ToListAsync();
        }

        public async Task<bool> UpdReceptionAsync(Reception reception)
        {
            try
            {
                await using (var context = CreateContext())
                {
                    context.Receptions.Attach(reception);
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
