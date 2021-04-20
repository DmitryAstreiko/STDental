using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class AddRenameSomeDBSets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupService_GroupNameService_GroupNameId",
                table: "GroupService");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupService_Services_GroupServiceId",
                table: "GroupService");

            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Talon_PaymentId",
                table: "Payment");

            migrationBuilder.DropForeignKey(
                name: "FK_Reception_Patients_PatientId",
                table: "Reception");

            migrationBuilder.DropForeignKey(
                name: "FK_Reception_Staffs_StaffId",
                table: "Reception");

            migrationBuilder.DropForeignKey(
                name: "FK_Talon_Patients_PatientId",
                table: "Talon");

            migrationBuilder.DropForeignKey(
                name: "FK_Talon_Staffs_StaffId",
                table: "Talon");

            migrationBuilder.DropForeignKey(
                name: "FK_TalonService_Services_ServiceId",
                table: "TalonService");

            migrationBuilder.DropForeignKey(
                name: "FK_TalonService_Talon_TalonId",
                table: "TalonService");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TalonService",
                table: "TalonService");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Talon",
                table: "Talon");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reception",
                table: "Reception");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Payment",
                table: "Payment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GroupService",
                table: "GroupService");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GroupNameService",
                table: "GroupNameService");

            migrationBuilder.RenameTable(
                name: "TalonService",
                newName: "TalonServices");

            migrationBuilder.RenameTable(
                name: "Talon",
                newName: "Talons");

            migrationBuilder.RenameTable(
                name: "Reception",
                newName: "Receptions");

            migrationBuilder.RenameTable(
                name: "Payment",
                newName: "Payments");

            migrationBuilder.RenameTable(
                name: "GroupService",
                newName: "GroupServices");

            migrationBuilder.RenameTable(
                name: "GroupNameService",
                newName: "GroupNameServices");

            migrationBuilder.RenameIndex(
                name: "IX_TalonService_TalonId",
                table: "TalonServices",
                newName: "IX_TalonServices_TalonId");

            migrationBuilder.RenameIndex(
                name: "IX_TalonService_ServiceId",
                table: "TalonServices",
                newName: "IX_TalonServices_ServiceId");

            migrationBuilder.RenameIndex(
                name: "IX_Talon_StaffId",
                table: "Talons",
                newName: "IX_Talons_StaffId");

            migrationBuilder.RenameIndex(
                name: "IX_Talon_PatientId",
                table: "Talons",
                newName: "IX_Talons_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_Reception_StaffId",
                table: "Receptions",
                newName: "IX_Receptions_StaffId");

            migrationBuilder.RenameIndex(
                name: "IX_Reception_PatientId",
                table: "Receptions",
                newName: "IX_Receptions_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_GroupService_GroupNameId",
                table: "GroupServices",
                newName: "IX_GroupServices_GroupNameId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TalonServices",
                table: "TalonServices",
                column: "TalonServiceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Talons",
                table: "Talons",
                column: "TalonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Receptions",
                table: "Receptions",
                column: "ReceptionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Payments",
                table: "Payments",
                column: "PaymentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GroupServices",
                table: "GroupServices",
                column: "GroupServiceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GroupNameServices",
                table: "GroupNameServices",
                column: "GroupNameId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupServices_GroupNameServices_GroupNameId",
                table: "GroupServices",
                column: "GroupNameId",
                principalTable: "GroupNameServices",
                principalColumn: "GroupNameId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupServices_Services_GroupServiceId",
                table: "GroupServices",
                column: "GroupServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Talons_PaymentId",
                table: "Payments",
                column: "PaymentId",
                principalTable: "Talons",
                principalColumn: "TalonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Receptions_Patients_PatientId",
                table: "Receptions",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Receptions_Staffs_StaffId",
                table: "Receptions",
                column: "StaffId",
                principalTable: "Staffs",
                principalColumn: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_Talons_Patients_PatientId",
                table: "Talons",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Talons_Staffs_StaffId",
                table: "Talons",
                column: "StaffId",
                principalTable: "Staffs",
                principalColumn: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_TalonServices_Services_ServiceId",
                table: "TalonServices",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_TalonServices_Talons_TalonId",
                table: "TalonServices",
                column: "TalonId",
                principalTable: "Talons",
                principalColumn: "TalonId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupServices_GroupNameServices_GroupNameId",
                table: "GroupServices");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupServices_Services_GroupServiceId",
                table: "GroupServices");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Talons_PaymentId",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Receptions_Patients_PatientId",
                table: "Receptions");

            migrationBuilder.DropForeignKey(
                name: "FK_Receptions_Staffs_StaffId",
                table: "Receptions");

            migrationBuilder.DropForeignKey(
                name: "FK_Talons_Patients_PatientId",
                table: "Talons");

            migrationBuilder.DropForeignKey(
                name: "FK_Talons_Staffs_StaffId",
                table: "Talons");

            migrationBuilder.DropForeignKey(
                name: "FK_TalonServices_Services_ServiceId",
                table: "TalonServices");

            migrationBuilder.DropForeignKey(
                name: "FK_TalonServices_Talons_TalonId",
                table: "TalonServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TalonServices",
                table: "TalonServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Talons",
                table: "Talons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Receptions",
                table: "Receptions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Payments",
                table: "Payments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GroupServices",
                table: "GroupServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GroupNameServices",
                table: "GroupNameServices");

            migrationBuilder.RenameTable(
                name: "TalonServices",
                newName: "TalonService");

            migrationBuilder.RenameTable(
                name: "Talons",
                newName: "Talon");

            migrationBuilder.RenameTable(
                name: "Receptions",
                newName: "Reception");

            migrationBuilder.RenameTable(
                name: "Payments",
                newName: "Payment");

            migrationBuilder.RenameTable(
                name: "GroupServices",
                newName: "GroupService");

            migrationBuilder.RenameTable(
                name: "GroupNameServices",
                newName: "GroupNameService");

            migrationBuilder.RenameIndex(
                name: "IX_TalonServices_TalonId",
                table: "TalonService",
                newName: "IX_TalonService_TalonId");

            migrationBuilder.RenameIndex(
                name: "IX_TalonServices_ServiceId",
                table: "TalonService",
                newName: "IX_TalonService_ServiceId");

            migrationBuilder.RenameIndex(
                name: "IX_Talons_StaffId",
                table: "Talon",
                newName: "IX_Talon_StaffId");

            migrationBuilder.RenameIndex(
                name: "IX_Talons_PatientId",
                table: "Talon",
                newName: "IX_Talon_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_Receptions_StaffId",
                table: "Reception",
                newName: "IX_Reception_StaffId");

            migrationBuilder.RenameIndex(
                name: "IX_Receptions_PatientId",
                table: "Reception",
                newName: "IX_Reception_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_GroupServices_GroupNameId",
                table: "GroupService",
                newName: "IX_GroupService_GroupNameId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TalonService",
                table: "TalonService",
                column: "TalonServiceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Talon",
                table: "Talon",
                column: "TalonId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reception",
                table: "Reception",
                column: "ReceptionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Payment",
                table: "Payment",
                column: "PaymentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GroupService",
                table: "GroupService",
                column: "GroupServiceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GroupNameService",
                table: "GroupNameService",
                column: "GroupNameId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupService_GroupNameService_GroupNameId",
                table: "GroupService",
                column: "GroupNameId",
                principalTable: "GroupNameService",
                principalColumn: "GroupNameId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupService_Services_GroupServiceId",
                table: "GroupService",
                column: "GroupServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Talon_PaymentId",
                table: "Payment",
                column: "PaymentId",
                principalTable: "Talon",
                principalColumn: "TalonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reception_Patients_PatientId",
                table: "Reception",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reception_Staffs_StaffId",
                table: "Reception",
                column: "StaffId",
                principalTable: "Staffs",
                principalColumn: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_Talon_Patients_PatientId",
                table: "Talon",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Talon_Staffs_StaffId",
                table: "Talon",
                column: "StaffId",
                principalTable: "Staffs",
                principalColumn: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_TalonService_Services_ServiceId",
                table: "TalonService",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_TalonService_Talon_TalonId",
                table: "TalonService",
                column: "TalonId",
                principalTable: "Talon",
                principalColumn: "TalonId");
        }
    }
}
