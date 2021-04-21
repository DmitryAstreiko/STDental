using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using STDentalLibrary.Models;

namespace STDentalLibrary.Repositories
{
    public interface IReceptionRepository
    {
        Task<IEnumerable<Reception>> GetReceptionsAsync(DateTime startDate, DateTime endDate);

        Task<IEnumerable<Reception>> GetReceptionsAsync(DateTime startDate, DateTime endDate, int staffId);

        Task<IEnumerable<Reception>> GetReceptionsAsync(DateTime startDate, DateTime endDate, Models.Enums.ReceptionStatus status);

        Task<IEnumerable<Reception>> GetReceptionsAsync(DateTime visitedDate);

        Task<int> AddReceptionAsync(Reception reception);

        Task<bool> UpdReceptionAsync(Reception reception);
    }
}
