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
        IEnumerable<Reception> GetReceptions(DateTime startDate, DateTime endDate);

        IEnumerable<Reception> GetReceptions(DateTime startDate, DateTime endDate, int staffId);

        IEnumerable<Reception> GetReceptions(DateTime startDate, DateTime endDate, Models.Enums.ReceptionStatus status);

        IEnumerable<Reception> GetReceptions(DateTime visitedDate);
    }
}
