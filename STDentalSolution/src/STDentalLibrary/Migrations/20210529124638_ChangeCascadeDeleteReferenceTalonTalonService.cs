using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class ChangeCascadeDeleteReferenceTalonTalonService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TalonServices_Talons_TalonId",
                table: "TalonServices");

            migrationBuilder.AddForeignKey(
                name: "FK_TalonServices_Talons_TalonId",
                table: "TalonServices",
                column: "TalonId",
                principalTable: "Talons",
                principalColumn: "TalonId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TalonServices_Talons_TalonId",
                table: "TalonServices");

            migrationBuilder.AddForeignKey(
                name: "FK_TalonServices_Talons_TalonId",
                table: "TalonServices",
                column: "TalonId",
                principalTable: "Talons",
                principalColumn: "TalonId");
        }
    }
}
