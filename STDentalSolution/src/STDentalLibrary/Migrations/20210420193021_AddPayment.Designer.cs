﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using STDentalLibrary.Context;

namespace STDentalLibrary.Migrations
{
    [DbContext(typeof(STDentalContext))]
    [Migration("20210420193021_AddPayment")]
    partial class AddPayment
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("STDentalLibrary.Models.Material", b =>
                {
                    b.Property<int>("MaterialId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("date");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,3)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("date");

                    b.Property<int>("UnitId")
                        .HasColumnType("int");

                    b.HasKey("MaterialId");

                    b.HasIndex("UnitId");

                    b.ToTable("Materials");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Option", b =>
                {
                    b.Property<int>("OptionsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasColumnName("Description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(32)")
                        .HasColumnName("Name");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)")
                        .HasColumnName("Value");

                    b.HasKey("OptionsId");

                    b.ToTable("Options");

                    b.HasData(
                        new
                        {
                            OptionsId = 1,
                            Description = "Полное наименование организации",
                            Name = "FullNameOrganization",
                            Value = "Открытое закрытое общество Рога и копыта"
                        },
                        new
                        {
                            OptionsId = 2,
                            Description = "Краткое наименование организации",
                            Name = "NameOrganization",
                            Value = "ОЗА Рога и копыта"
                        },
                        new
                        {
                            OptionsId = 3,
                            Description = "УНП организации",
                            Name = "UNP",
                            Value = "3223322"
                        },
                        new
                        {
                            OptionsId = 4,
                            Description = "Юридический адрес организации",
                            Name = "LegalAdress",
                            Value = "г. Минск, ул. Победы, 122"
                        },
                        new
                        {
                            OptionsId = 5,
                            Description = "Физический адрес организации",
                            Name = "PhysicalAdress",
                            Value = "г. Минск, ул. Маркса и Федора, 654'"
                        },
                        new
                        {
                            OptionsId = 6,
                            Description = "ФИО руководителя",
                            Name = "HeadFIO",
                            Value = "Усаче Длинный Васильевич"
                        },
                        new
                        {
                            OptionsId = 7,
                            Description = "Должность руководителя",
                            Name = "HeadPost",
                            Value = "Генеральный директор"
                        },
                        new
                        {
                            OptionsId = 8,
                            Description = "ФИО главного бухгалтера",
                            Name = "AccountantGeneral",
                            Value = "Жуков Гадя Петрович"
                        },
                        new
                        {
                            OptionsId = 9,
                            Description = "Наименование обслуживающего банка",
                            Name = "BankName",
                            Value = "ОАО Самый главный банк"
                        },
                        new
                        {
                            OptionsId = 10,
                            Description = "Расчетный счет организации",
                            Name = "BankAccount",
                            Value = "3112315315465168463513"
                        },
                        new
                        {
                            OptionsId = 11,
                            Description = "Адрес обслуживающего банка",
                            Name = "BankAdress",
                            Value = "г. Минск, ул. Бядули, 33"
                        },
                        new
                        {
                            OptionsId = 12,
                            Description = "БИК обслуживающего банка",
                            Name = "BankSWIFT",
                            Value = "XXYYXXYY"
                        });
                });

            modelBuilder.Entity("STDentalLibrary.Models.Patient", b =>
                {
                    b.Property<int>("PatientId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(64)");

                    b.Property<DateTime>("DateBorn")
                        .HasColumnType("date");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)");

                    b.Property<int>("NationalityId")
                        .HasColumnType("int");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(16)");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)");

                    b.HasKey("PatientId");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Payment", b =>
                {
                    b.Property<int>("paymentId")
                        .HasColumnType("int");

                    b.Property<decimal>("AmountBefore")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime");

                    b.Property<decimal>("Dept")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("PaidTotal")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("PaymentAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("PaymentDate")
                        .HasColumnType("date");

                    b.Property<int>("TalonId")
                        .HasColumnType("int");

                    b.HasKey("paymentId");

                    b.ToTable("Payment");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Post", b =>
                {
                    b.Property<int>("PostId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)");

                    b.HasKey("PostId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Service", b =>
                {
                    b.Property<int>("ServiceId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("date");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(512)");

                    b.Property<string>("Shifr")
                        .IsRequired()
                        .HasColumnType("nvarchar(20)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("date");

                    b.Property<int>("UnitId")
                        .HasColumnType("int");

                    b.HasKey("ServiceId");

                    b.HasIndex("UnitId");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("STDentalLibrary.Models.ServiceCostCalculation", b =>
                {
                    b.Property<int>("ServiceCostId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Cost")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("MaterialsCost")
                        .HasColumnType("decimal(18,3)");

                    b.Property<int>("Sale")
                        .HasColumnType("int");

                    b.Property<int>("ServiceId")
                        .HasColumnType("int");

                    b.Property<decimal>("Summa")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("SummaSales")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("WorkCost")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("ServiceCostId");

                    b.ToTable("ServiceCostCalculations");
                });

            modelBuilder.Entity("STDentalLibrary.Models.ServiceMaterial", b =>
                {
                    b.Property<int>("ServiceMaterialId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Cost")
                        .HasColumnType("decimal(18,3)");

                    b.Property<int>("MaterialId")
                        .HasColumnType("int");

                    b.Property<decimal>("Norm")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,3)");

                    b.Property<int>("ServiceId")
                        .HasColumnType("int");

                    b.HasKey("ServiceMaterialId");

                    b.HasIndex("MaterialId");

                    b.HasIndex("ServiceId");

                    b.ToTable("ServiceMaterials");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Staff", b =>
                {
                    b.Property<int>("StaffId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<int?>("PostId")
                        .HasColumnType("int");

                    b.Property<int>("RenderService")
                        .HasColumnType("int");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<int>("StaffStatus")
                        .HasColumnType("int");

                    b.HasKey("StaffId");

                    b.HasIndex("PostId");

                    b.ToTable("Staffs");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Talon", b =>
                {
                    b.Property<int>("TalonId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("ChangeDate")
                        .HasColumnType("datetime");

                    b.Property<decimal>("Cost")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.Property<int>("PaymentStatus")
                        .HasColumnType("int");

                    b.Property<int>("Sale")
                        .HasColumnType("int");

                    b.Property<int>("StaffId")
                        .HasColumnType("int");

                    b.Property<decimal>("Summa")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("SummaSale")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("TalonId");

                    b.HasIndex("PatientId");

                    b.HasIndex("StaffId");

                    b.ToTable("Talon");
                });

            modelBuilder.Entity("STDentalLibrary.Models.TalonService", b =>
                {
                    b.Property<int>("TalonServiceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<decimal>("Cost")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("ServiceId")
                        .HasColumnType("int");

                    b.Property<int>("TalonId")
                        .HasColumnType("int");

                    b.HasKey("TalonServiceId");

                    b.HasIndex("ServiceId");

                    b.HasIndex("TalonId");

                    b.ToTable("TalonService");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Unit", b =>
                {
                    b.Property<int>("UnitId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(32)");

                    b.HasKey("UnitId");

                    b.ToTable("Units");

                    b.HasData(
                        new
                        {
                            UnitId = 1,
                            Name = "мл."
                        },
                        new
                        {
                            UnitId = 2,
                            Name = "шт."
                        },
                        new
                        {
                            UnitId = 3,
                            Name = "гр."
                        },
                        new
                        {
                            UnitId = 4,
                            Name = "кг."
                        },
                        new
                        {
                            UnitId = 5,
                            Name = "см."
                        },
                        new
                        {
                            UnitId = 6,
                            Name = "карпула"
                        },
                        new
                        {
                            UnitId = 7,
                            Name = "пар"
                        },
                        new
                        {
                            UnitId = 8,
                            Name = "кв.см."
                        },
                        new
                        {
                            UnitId = 9,
                            Name = "манипуляция"
                        },
                        new
                        {
                            UnitId = 10,
                            Name = "процедура"
                        },
                        new
                        {
                            UnitId = 11,
                            Name = "консультация"
                        },
                        new
                        {
                            UnitId = 12,
                            Name = "обследование"
                        });
                });

            modelBuilder.Entity("STDentalLibrary.Models.Material", b =>
                {
                    b.HasOne("STDentalLibrary.Models.Unit", "Unit")
                        .WithMany("Materials")
                        .HasForeignKey("UnitId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Unit");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Payment", b =>
                {
                    b.HasOne("STDentalLibrary.Models.Talon", "talon")
                        .WithMany("Payments")
                        .HasForeignKey("paymentId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("talon");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Service", b =>
                {
                    b.HasOne("STDentalLibrary.Models.ServiceCostCalculation", "ServiceCostCalculation")
                        .WithOne("Service")
                        .HasForeignKey("STDentalLibrary.Models.Service", "ServiceId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("STDentalLibrary.Models.Unit", "Unit")
                        .WithMany("Services")
                        .HasForeignKey("UnitId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("ServiceCostCalculation");

                    b.Navigation("Unit");
                });

            modelBuilder.Entity("STDentalLibrary.Models.ServiceMaterial", b =>
                {
                    b.HasOne("STDentalLibrary.Models.Material", "Material")
                        .WithMany("ServiceMaterials")
                        .HasForeignKey("MaterialId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("STDentalLibrary.Models.Service", "Service")
                        .WithMany("ServiceMaterials")
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Material");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Staff", b =>
                {
                    b.HasOne("STDentalLibrary.Models.Post", "Post")
                        .WithMany("Staffs")
                        .HasForeignKey("PostId");

                    b.OwnsOne("STDentalLibrary.Models.StaffCredential", "StaffCredential", b1 =>
                        {
                            b1.Property<int>("StaffId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<string>("UserLogin")
                                .HasColumnType("nvarchar(max)")
                                .HasColumnName("UserLogin");

                            b1.Property<string>("UserPass")
                                .HasColumnType("nvarchar(max)")
                                .HasColumnName("UserPass");

                            b1.HasKey("StaffId");

                            b1.ToTable("Staffs");

                            b1.WithOwner()
                                .HasForeignKey("StaffId");
                        });

                    b.Navigation("Post");

                    b.Navigation("StaffCredential");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Talon", b =>
                {
                    b.HasOne("STDentalLibrary.Models.Patient", "Patient")
                        .WithMany("Talons")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("STDentalLibrary.Models.Staff", "Staff")
                        .WithMany("Talons")
                        .HasForeignKey("StaffId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Patient");

                    b.Navigation("Staff");
                });

            modelBuilder.Entity("STDentalLibrary.Models.TalonService", b =>
                {
                    b.HasOne("STDentalLibrary.Models.Service", "Service")
                        .WithMany("TalonServices")
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("STDentalLibrary.Models.Talon", "Talon")
                        .WithMany("TalonServices")
                        .HasForeignKey("TalonId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Service");

                    b.Navigation("Talon");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Material", b =>
                {
                    b.Navigation("ServiceMaterials");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Patient", b =>
                {
                    b.Navigation("Talons");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Post", b =>
                {
                    b.Navigation("Staffs");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Service", b =>
                {
                    b.Navigation("ServiceMaterials");

                    b.Navigation("TalonServices");
                });

            modelBuilder.Entity("STDentalLibrary.Models.ServiceCostCalculation", b =>
                {
                    b.Navigation("Service");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Staff", b =>
                {
                    b.Navigation("Talons");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Talon", b =>
                {
                    b.Navigation("Payments");

                    b.Navigation("TalonServices");
                });

            modelBuilder.Entity("STDentalLibrary.Models.Unit", b =>
                {
                    b.Navigation("Materials");

                    b.Navigation("Services");
                });
#pragma warning restore 612, 618
        }
    }
}
