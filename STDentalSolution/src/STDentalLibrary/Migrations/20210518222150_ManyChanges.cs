using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class ManyChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "Materials",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "date");

            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "Materials",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "GroupNameServices",
                columns: table => new
                {
                    GroupNameId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(150)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupNameServices", x => x.GroupNameId);
                });

            migrationBuilder.CreateTable(
                name: "Receptions",
                columns: table => new
                {
                    ReceptionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VisitDay = table.Column<DateTime>(type: "date", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(512)", nullable: false),
                    ReceptionStatus = table.Column<int>(type: "int", nullable: false),
                    StaffId = table.Column<int>(type: "int", nullable: false),
                    PatientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Receptions", x => x.ReceptionId);
                    table.ForeignKey(
                        name: "FK_Receptions_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "PatientId");
                    table.ForeignKey(
                        name: "FK_Receptions_Staffs_StaffId",
                        column: x => x.StaffId,
                        principalTable: "Staffs",
                        principalColumn: "StaffId");
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    ServiceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(512)", nullable: false),
                    Shifr = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    StartDate = table.Column<DateTime>(type: "date", nullable: false),
                    EndDate = table.Column<DateTime>(type: "date", nullable: true),
                    UnitId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.ServiceId);
                    table.ForeignKey(
                        name: "FK_Services_Units_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Units",
                        principalColumn: "UnitId");
                });

            migrationBuilder.CreateTable(
                name: "Talons",
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
                    Description = table.Column<string>(type: "nvarchar(512)", nullable: true),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    StaffId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Talons", x => x.TalonId);
                    table.ForeignKey(
                        name: "FK_Talons_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "PatientId");
                    table.ForeignKey(
                        name: "FK_Talons_Staffs_StaffId",
                        column: x => x.StaffId,
                        principalTable: "Staffs",
                        principalColumn: "StaffId");
                });

            migrationBuilder.CreateTable(
                name: "GroupServices",
                columns: table => new
                {
                    GroupServiceId = table.Column<int>(type: "int", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    GroupNameId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupServices", x => x.GroupServiceId);
                    table.ForeignKey(
                        name: "FK_GroupServices_GroupNameServices_GroupNameId",
                        column: x => x.GroupNameId,
                        principalTable: "GroupNameServices",
                        principalColumn: "GroupNameId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupServices_Services_GroupServiceId",
                        column: x => x.GroupServiceId,
                        principalTable: "Services",
                        principalColumn: "ServiceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServiceCostCalculations",
                columns: table => new
                {
                    ServiceCostId = table.Column<int>(type: "int", nullable: false),
                    WorkCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MaterialsCost = table.Column<decimal>(type: "decimal(18,3)", nullable: false),
                    Summa = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Sale = table.Column<int>(type: "int", nullable: false),
                    SummaSales = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceCostCalculations", x => x.ServiceCostId);
                    table.ForeignKey(
                        name: "FK_ServiceCostCalculations_Services_ServiceCostId",
                        column: x => x.ServiceCostId,
                        principalTable: "Services",
                        principalColumn: "ServiceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServiceMaterials",
                columns: table => new
                {
                    ServiceMaterialId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<decimal>(type: "decimal(18,3)", nullable: false),
                    Norm = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(18,3)", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    MaterialId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceMaterials", x => x.ServiceMaterialId);
                    table.ForeignKey(
                        name: "FK_ServiceMaterials_Materials_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Materials",
                        principalColumn: "MaterialId");
                    table.ForeignKey(
                        name: "FK_ServiceMaterials_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "ServiceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    PaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AmountBefore = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Dept = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaidTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "date", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    TalonId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.PaymentId);
                    table.ForeignKey(
                        name: "FK_Payments_Talons_PaymentId",
                        column: x => x.PaymentId,
                        principalTable: "Talons",
                        principalColumn: "TalonId");
                });

            migrationBuilder.CreateTable(
                name: "TalonServices",
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
                    table.PrimaryKey("PK_TalonServices", x => x.TalonServiceId);
                    table.ForeignKey(
                        name: "FK_TalonServices_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "ServiceId");
                    table.ForeignKey(
                        name: "FK_TalonServices_Talons_TalonId",
                        column: x => x.TalonId,
                        principalTable: "Talons",
                        principalColumn: "TalonId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupServices_GroupNameId",
                table: "GroupServices",
                column: "GroupNameId");

            migrationBuilder.CreateIndex(
                name: "IX_Receptions_PatientId",
                table: "Receptions",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Receptions_StaffId",
                table: "Receptions",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceMaterials_MaterialId",
                table: "ServiceMaterials",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceMaterials_ServiceId",
                table: "ServiceMaterials",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_UnitId",
                table: "Services",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Talons_PatientId",
                table: "Talons",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Talons_StaffId",
                table: "Talons",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_TalonServices_ServiceId",
                table: "TalonServices",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_TalonServices_TalonId",
                table: "TalonServices",
                column: "TalonId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupServices");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Receptions");

            migrationBuilder.DropTable(
                name: "ServiceCostCalculations");

            migrationBuilder.DropTable(
                name: "ServiceMaterials");

            migrationBuilder.DropTable(
                name: "TalonServices");

            migrationBuilder.DropTable(
                name: "GroupNameServices");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Talons");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "Materials");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "Materials",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "date",
                oldNullable: true);
        }
    }
}
