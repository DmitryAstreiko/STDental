using Microsoft.EntityFrameworkCore;
using STDentalLibrary.Models;

namespace STDentalLibrary.Context
{
    public class STDentalContext : DbContext
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Option>()
                .ToTable("Options");

            modelBuilder.Entity<Option>(option =>
            {
                option.HasKey(o => o.OptionsId);

                option.Property(p => p.Name)
                    .HasColumnName("Name")
                    .HasColumnType("nvarchar(32)")
                    .IsRequired();

                option.Property(p => p.Value)
                    .HasColumnName("Value")
                    .HasColumnType("nvarchar(128)")
                    .IsRequired();

                option.Property(p => p.Description)
                    .HasColumnName("Description")
                    .HasColumnType("nvarchar(256)")
                    .IsRequired();
            });
        }
    }
}
