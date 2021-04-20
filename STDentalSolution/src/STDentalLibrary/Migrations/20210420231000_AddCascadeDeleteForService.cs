using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class AddCascadeDeleteForService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceMaterials_Services_ServiceId",
                table: "ServiceMaterials");

            migrationBuilder.DropForeignKey(
                name: "FK_Services_ServiceCostCalculations_ServiceId",
                table: "Services");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceMaterials_Services_ServiceId",
                table: "ServiceMaterials",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_ServiceCostCalculations_ServiceId",
                table: "Services",
                column: "ServiceId",
                principalTable: "ServiceCostCalculations",
                principalColumn: "ServiceCostId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceMaterials_Services_ServiceId",
                table: "ServiceMaterials");

            migrationBuilder.DropForeignKey(
                name: "FK_Services_ServiceCostCalculations_ServiceId",
                table: "Services");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceMaterials_Services_ServiceId",
                table: "ServiceMaterials",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_ServiceCostCalculations_ServiceId",
                table: "Services",
                column: "ServiceId",
                principalTable: "ServiceCostCalculations",
                principalColumn: "ServiceCostId");
        }
    }
}
