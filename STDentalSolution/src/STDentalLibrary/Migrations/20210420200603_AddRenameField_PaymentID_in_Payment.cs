using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class AddRenameField_PaymentID_in_Payment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Talon_paymentId",
                table: "Payment");

            migrationBuilder.RenameColumn(
                name: "paymentId",
                table: "Payment",
                newName: "PaymentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Talon_PaymentId",
                table: "Payment",
                column: "PaymentId",
                principalTable: "Talon",
                principalColumn: "TalonId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Talon_PaymentId",
                table: "Payment");

            migrationBuilder.RenameColumn(
                name: "PaymentId",
                table: "Payment",
                newName: "paymentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Talon_paymentId",
                table: "Payment",
                column: "paymentId",
                principalTable: "Talon",
                principalColumn: "TalonId");
        }
    }
}
