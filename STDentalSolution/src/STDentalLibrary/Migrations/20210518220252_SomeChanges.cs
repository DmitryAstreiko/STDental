using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class SomeChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            /*migrationBuilder.DropForeignKey(
                name: "FK_Services_ServiceCostCalculations_ServiceId",
                table: "Services");

            migrationBuilder.AlterColumn<int>(
                name: "ServiceId",
                table: "Services",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceCostCalculations_ServiceId",
                table: "ServiceCostCalculations",
                column: "ServiceId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceCostCalculations_Services_ServiceId",
                table: "ServiceCostCalculations",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Cascade);*/
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            /*migrationBuilder.DropForeignKey(
                name: "FK_ServiceCostCalculations_Services_ServiceId",
                table: "ServiceCostCalculations");

            migrationBuilder.DropIndex(
                name: "IX_ServiceCostCalculations_ServiceId",
                table: "ServiceCostCalculations");

            migrationBuilder.AlterColumn<int>(
                name: "ServiceId",
                table: "Services",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_ServiceCostCalculations_ServiceId",
                table: "Services",
                column: "ServiceId",
                principalTable: "ServiceCostCalculations",
                principalColumn: "ServiceCostId",
                onDelete: ReferentialAction.Cascade);*/
        }
    }
}
