using Microsoft.EntityFrameworkCore;
using STDentalLibrary.Models;

namespace STDentalLibrary.Context
{
    internal class STDentalContext : DbContext
    {
        private readonly string _connectionValue;

        public DbSet<Option> Options { get; set; }

        public STDentalContext(string connectionValue = null)
        {
            this._connectionValue = connectionValue;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                _connectionValue ?? @"Data Source=.\SQLExpress;Initial Catalog=STDentalTest;Integrated Security=True");
        }
    }
}
