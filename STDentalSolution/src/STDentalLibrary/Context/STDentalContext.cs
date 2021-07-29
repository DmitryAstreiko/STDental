using Microsoft.EntityFrameworkCore;
using STDentalLibrary.Models;
using STDentalLibrary.Models.Enums;

namespace STDentalLibrary.Context
{
    public class STDentalContext : DbContext
    {
        private readonly string _connectionValue;

        public DbSet<Option> Options { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<ServiceMaterial> ServiceMaterials { get; set; }
        public DbSet<ServiceCostCalculation> ServiceCostCalculations { get; set; }
        public DbSet<Talon> Talons { get; set; }
        public DbSet<TalonService> TalonServices { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<GroupNameService> GroupNameServices { get; set; }
        public DbSet<GroupService> GroupServices { get; set; }
        public DbSet<Reception> Receptions { get; set; }

        public STDentalContext(string connectionValue = null)
        {
            _connectionValue = connectionValue;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            /* optionsBuilder.UseSqlServer(
                 _connectionValue ?? @"Data Source=.\SQLExpress;Initial Catalog=STDentalTest;Integrated Security=True");*/

            optionsBuilder.UseSqlServer("Server = .\\SQLEXPRESS; Database = STDentalTestNew; Trusted_Connection = True");
            //optionsBuilder.UseSqlServer("Server = tcp:stdentalreactdbserver.database.windows.net,1433; Initial Catalog = STDental_db_test; Persist Security Info = False; User ID = dentaladmin; Password = Preved_1Medved; MultipleActiveResultSets = False; Encrypt = True; TrustServerCertificate = False; Connection Timeout = 30");

            //optionsBuilder.UseSqlServer(_connectionValue);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Options

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

            modelBuilder.Entity<Option>().HasData(
                new Option { OptionsId = 1, Name = "FullNameOrganization", Value = "Открытое закрытое общество Рога и копыта", Description = "Полное наименование организации" }, 
                    new Option { OptionsId = 2, Name = "NameOrganization", Value = "ОЗА Рога и копыта", Description = "Краткое наименование организации" },
                    new Option { OptionsId = 3, Name = "UNP", Value = "3223322", Description = "УНП организации" },
                    new Option { OptionsId = 4, Name = "LegalAdress", Value = "г. Минск, ул. Победы, 122", Description = "Юридический адрес организации" },
                    new Option { OptionsId = 5, Name = "PhysicalAdress", Value = "г. Минск, ул. Маркса и Федора, 654'", Description = "Физический адрес организации" },
                    new Option { OptionsId = 6, Name = "HeadFIO", Value = "Усаче Длинный Васильевич", Description = "ФИО руководителя" },
                    new Option { OptionsId = 7, Name = "HeadPost", Value = "Генеральный директор", Description = "Должность руководителя" },
                    new Option { OptionsId = 8, Name = "AccountantGeneral", Value = "Жуков Гадя Петрович", Description = "ФИО главного бухгалтера" },
                    new Option { OptionsId = 9, Name = "BankName", Value = "ОАО Самый главный банк", Description = "Наименование обслуживающего банка" },
                    new Option { OptionsId = 10, Name = "BankAccount", Value = "3112315315465168463513", Description = "Расчетный счет организации" },
                    new Option { OptionsId = 11, Name = "BankAdress", Value = "г. Минск, ул. Бядули, 33", Description = "Адрес обслуживающего банка" },
                    new Option { OptionsId = 12, Name = "BankSWIFT", Value = "XXYYXXYY", Description = "БИК обслуживающего банка" }
                );

            #endregion

            #region Posts
            modelBuilder.Entity<Post>(post =>
            {
                post.HasKey(o => o.PostId);

                post.Property(p => p.Name)
                    //.HasColumnName("Name")
                    .HasColumnType("nvarchar(128)")
                    .IsRequired();
            });
            #endregion

            #region Staffs
            modelBuilder.Entity<Staff>(staff =>
            {
                staff.HasKey(o => o.StaffId);

                staff.Property(p => p.Name)
                    //.HasColumnName("Name")
                    .HasColumnType("nvarchar(250)")
                    .IsRequired();

                staff.OwnsOne(p => p.StaffCredential);
            });
            #endregion

            #region Patients
            
            modelBuilder.Entity<Patient>(patient =>
            {
                patient.HasKey(o => o.PatientId);

                patient.Property(p => p.Name)
                    .HasColumnType("nvarchar(256)")
                    .IsRequired();

                patient.Property(p => p.City)
                    .HasColumnType("nvarchar(64)")
                    .IsRequired();

                patient.Property(p => p.Street)
                    .HasColumnType("nvarchar(128)")
                    .IsRequired();

                patient.Property(p => p.Phone)
                    .HasColumnType("nvarchar(16)")
                    .IsRequired();

                patient.Property(p => p.DateBorn)
                    .HasColumnType("date")
                    .IsRequired();
            });

            #endregion

            #region Materials

            modelBuilder.Entity<Material>(material =>
             {
                 material.HasKey(o => o.MaterialId);

                 material.Property(p => p.Name)
                     .HasColumnType("nvarchar(128)")
                     .IsRequired();

                 material.HasOne(m => m.Unit)
                     .WithMany(u => u.Materials)
                     .HasForeignKey(u => u.UnitId)
                     .OnDelete(DeleteBehavior.NoAction);

                 material.Property(p => p.CreateDate)
                     .HasColumnType("datetime")
                     .IsRequired();

                 material.Property(p => p.Price)
                     .HasColumnType("decimal(18,3)")
                     .IsRequired();

                 material.Property(p => p.StartDate)
                     .HasColumnType("date")
                     .IsRequired();

                 material.Property(p => p.EndDate)
                     .HasColumnType("date");

                 material.Property(p => p.ParentId)
                     .HasColumnType("int");
             });

            #endregion

            #region Units

            modelBuilder.Entity<Unit>(unit =>
            {
                unit.HasKey(o => o.UnitId);

                unit.Property(p => p.Name)
                    .HasColumnType("nvarchar(32)")
                    .IsRequired();
            });

            modelBuilder.Entity<Unit>().HasData(
            new Unit { UnitId = 1, Name = "мл."},
            new Unit { UnitId = 2, Name = "шт." },
            new Unit { UnitId = 3, Name = "гр." },
            new Unit { UnitId = 4, Name = "кг." },
            new Unit { UnitId = 5, Name = "см." },
            new Unit { UnitId = 6, Name = "карпула" },
            new Unit { UnitId = 7, Name = "пар" },
            new Unit { UnitId = 8, Name = "кв.см." },
            new Unit { UnitId = 9, Name = "манипуляция" },
            new Unit { UnitId = 10, Name = "процедура" },
            new Unit { UnitId = 11, Name = "консультация" },
            new Unit { UnitId = 12, Name = "обследование" }
            );

            #endregion

            #region Services

            modelBuilder.Entity<Service>(service =>
            {
                service.HasKey(o => o.ServiceId);

                service.Property(p => p.Name)
                    .HasColumnType("nvarchar(512)")
                    .IsRequired();

                service.HasOne(m => m.Unit)
                    .WithMany(u => u.Services)
                    .HasForeignKey(u => u.UnitId)
                    .OnDelete(DeleteBehavior.NoAction);

                service.HasOne(m => m.ServiceCostCalculation)
                    .WithOne(u => u.Service)
                    .HasForeignKey<ServiceCostCalculation>(u => u.ServiceId)
                    .OnDelete(DeleteBehavior.Cascade);

                service.Property(p => p.Shifr)
                    .HasColumnType("nvarchar(20)")
                    .IsRequired();

                service.Property(p => p.CreateDate)
                    .HasColumnType("datetime")
                    .IsRequired();

                service.Property(p => p.StartDate)
                    .HasColumnType("date")
                    .IsRequired();

                service.Property(p => p.EndDate)
                    .HasColumnType("date");
            });

            #endregion

            #region ServiceCostCalculation

            modelBuilder.Entity<ServiceCostCalculation>(serviceCost =>
            {
                serviceCost.HasKey(s => s.ServiceCostId);

                //serviceCost.HasNoKey();
                
                serviceCost.Property(p => p.WorkCost)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                serviceCost.Property(p => p.MaterialsCost)
                    .HasColumnType("decimal(18,3)")
                    .IsRequired();

                serviceCost.Property(p => p.Summa)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                serviceCost.Property(p => p.Sale)
                    .HasColumnType("int")
                    .IsRequired();

                serviceCost.Property(p => p.SummaSales)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                serviceCost.Property(p => p.Cost)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                /*serviceCost.HasOne(m => m.Service)
                    .WithOne(u => u.ServiceCostCalculation)
                    .HasForeignKey<Service>(u => u.ServiceId)
                    .OnDelete(DeleteBehavior.Cascade);*/
            });

            #endregion

            #region ServiceMaterials

            modelBuilder.Entity<ServiceMaterial>(serviceMaterial =>
            {
                serviceMaterial.HasKey(o => o.ServiceMaterialId);

                serviceMaterial.Property(p => p.Price)
                    .HasColumnType("decimal(18,3)")
                    .IsRequired();

                serviceMaterial.Property(p => p.Norm)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                serviceMaterial.Property(p => p.Cost)
                    .HasColumnType("decimal(18,3)")
                    .IsRequired();

                serviceMaterial.HasOne(m => m.Service)
                    .WithMany(u => u.ServiceMaterials)
                    .HasForeignKey(u => u.ServiceId)
                    .OnDelete(DeleteBehavior.Cascade);

                serviceMaterial.HasOne(m => m.Material)
                    .WithMany(s => s.ServiceMaterials)
                    .HasForeignKey(m => m.MaterialId)
                    .OnDelete(DeleteBehavior.NoAction);
            });

            #endregion

            #region Talons

            modelBuilder.Entity<Talon>(talon =>
            {
                talon.HasKey(o => o.TalonId);

                talon.HasOne(u => u.Patient)
                    .WithMany(t => t.Talons)
                    .HasForeignKey(u => u.PatientId)
                    .OnDelete(DeleteBehavior.NoAction);

                talon.HasOne(s => s.Staff)
                    .WithMany(t => t.Talons)
                    .HasForeignKey(s => s.StaffId)
                    .OnDelete(DeleteBehavior.NoAction);

                talon.Property(p => p.Summa)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                talon.Property(p => p.Sale)
                    .HasColumnType("int")
                    .IsRequired();

                talon.Property(p => p.SummaSale)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                talon.Property(p => p.Cost)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                talon.Property(p => p.CreateDate)
                    .HasColumnType("datetime")
                    .IsRequired();

                talon.Property(p => p.ChangeDate)
                    .HasColumnType("datetime");

                talon.Property(p => p.Description)
                    .HasColumnType("nvarchar(512)");
            });

            #endregion

            #region TalonServices

            modelBuilder.Entity<TalonService>(talonService =>
            {
                talonService.HasKey(o => o.TalonServiceId);

                talonService.HasOne(u => u.Service)
                    .WithMany(t => t.TalonServices)
                    .HasForeignKey(u => u.ServiceId)
                    .OnDelete(DeleteBehavior.NoAction);

                talonService.HasOne(s => s.Talon)
                    .WithMany(t => t.TalonServices)
                    .HasForeignKey(s => s.TalonId)
                    .OnDelete(DeleteBehavior.Cascade);

                talonService.Property(p => p.Price)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                talonService.Property(p => p.Amount)
                    .HasColumnType("int")
                    .IsRequired();

                talonService.Property(p => p.Cost)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();
            });

            #endregion

            #region Payments

            modelBuilder.Entity<Payment>(payment =>
            {
                payment.HasKey(o => o.PaymentId);

                payment.HasOne(u => u.Talon)
                    .WithMany(t => t.Payments)
                    .HasForeignKey(u => u.PaymentId)
                    .OnDelete(DeleteBehavior.NoAction);

                payment.Property(p => p.AmountBefore)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                payment.Property(p => p.PaymentAmount)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                payment.Property(p => p.Dept)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                payment.Property(p => p.PaidTotal)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                payment.Property(p => p.PaymentDate)
                    .HasColumnType("date")
                    .IsRequired();

                payment.Property(p => p.CreateDate)
                    .HasColumnType("datetime")
                    .IsRequired();
            });

            #endregion

            #region GroupNameService

            modelBuilder.Entity<GroupNameService>(groupName =>
            {
                groupName.HasKey(o => o.GroupNameId);

                groupName.Property(p => p.Name)
                    .HasColumnType("nvarchar(150)")
                    .IsRequired();
            });

            #endregion

            #region GroupService

            modelBuilder.Entity<GroupService>(groupService =>
            {
                groupService.HasKey(o => o.GroupServiceId);

                groupService.HasOne(u => u.GroupName)
                    .WithMany(t => t.GroupServices)
                    .HasForeignKey(u => u.GroupNameId)
                    .OnDelete(DeleteBehavior.Cascade);

                groupService.HasOne(u => u.Service)
                    .WithMany(t => t.GroupServices)
                    .HasForeignKey(u => u.GroupServiceId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            #endregion

            #region Receptions

            modelBuilder.Entity<Reception>(reception =>
            {
                reception.HasKey(o => o.ReceptionId);

                reception.HasOne(u => u.Staff)
                    .WithMany(t => t.Receptions)
                    .HasForeignKey(u => u.StaffId)
                    .OnDelete(DeleteBehavior.NoAction);

                reception.HasOne(u => u.Patient)
                    .WithMany(t => t.Receptions)
                    .HasForeignKey(u => u.PatientId)
                    .OnDelete(DeleteBehavior.NoAction);

                reception.Property(p => p.VisitDay)
                    .HasColumnType("date")
                    .IsRequired();

                reception.Property(p => p.StartTime)
                    .HasColumnType("datetime")
                    .IsRequired();

                reception.Property(p => p.EndTime)
                    .HasColumnType("datetime")
                    .IsRequired();

                reception.Property(p => p.Comment)
                    .HasColumnType("nvarchar(512)")
                    .IsRequired();
            });

            #endregion
        }
    }
}
