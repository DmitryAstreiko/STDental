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
    [Migration("20210418215331_AddStaff")]
    partial class AddStaff
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

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

            modelBuilder.Entity("STDentalLibrary.Models.Post", b =>
                {
                    b.Navigation("Staffs");
                });
#pragma warning restore 612, 618
        }
    }
}
