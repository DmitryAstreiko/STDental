using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class AddTalon_TalonService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Talon",
                columns: table => new
                {
                    TalonId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ChangeDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    Summa = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Sale = table.Column<int>(type: "int", nullable: false),
                    SummaSale = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentStatus = table.Column<int>(type: "int", nullable: false),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    StaffId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Talon", x => x.TalonId);
                    table.ForeignKey(
                        name: "FK_Talon_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "PatientId");
                    table.ForeignKey(
                        name: "FK_Talon_Staffs_StaffId",
                        column: x => x.StaffId,
                        principalTable: "Staffs",
                        principalColumn: "StaffId");
                });

            migrationBuilder.CreateTable(
                name: "TalonService",
                columns: table => new
                {
                    TalonServiceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    TalonId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TalonService", x => x.TalonServiceId);
                    table.ForeignKey(
                        name: "FK_TalonService_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "ServiceId");
                    table.ForeignKey(
                        name: "FK_TalonService_Talon_TalonId",
                        column: x => x.TalonId,
                        principalTable: "Talon",
                        principalColumn: "TalonId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Talon_PatientId",
                table: "Talon",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Talon_StaffId",
                table: "Talon",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_TalonService_ServiceId",
                table: "TalonService",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_TalonService_TalonId",
                table: "TalonService",
                column: "TalonId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TalonService");

            migrationBuilder.DropTable(
                name: "Talon");
        }
    }
}
