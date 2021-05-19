using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class DeleteFieldServiceCostIdINServiceCostCalculation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceCostCalculations_Services_ServiceCostId",
                table: "ServiceCostCalculations");

            /*migrationBuilder.AlterColumn<int>(
                name: "ServiceCostId",
                table: "ServiceCostCalculations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");*/

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiceCostCalculations",
                table: "ServiceCostCalculations");

            migrationBuilder.DropColumn(
                name: "ServiceCostId",
                table: "ServiceCostCalculations");

            migrationBuilder.AddColumn<string>(
                name: "ServiceCostId",
                table: "ServiceCostCalculations",
                type: "int",
                nullable: false)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiceCostCalculations",
                table: "ServiceCostCalculations",
                column: "ServiceCostId");

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
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceCostCalculations_Services_ServiceId",
                table: "ServiceCostCalculations");

            migrationBuilder.DropIndex(
                name: "IX_ServiceCostCalculations_ServiceId",
                table: "ServiceCostCalculations");

            /*migrationBuilder.AlterColumn<int>(
                name: "ServiceCostId",
                table: "ServiceCostCalculations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");*/

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiceCostCalculations",
                table: "ServiceCostCalculations");

            migrationBuilder.DropColumn(
                name: "ServiceCostId",
                table: "ServiceCostCalculations");

            migrationBuilder.AddColumn<string>(
                    name: "ServiceCostId",
                    table: "ServiceCostCalculations",
                    type: "int",
                    nullable: false)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiceCostCalculations",
                table: "ServiceCostCalculations",
                column: "ServiceCostId");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceCostCalculations_Services_ServiceCostId",
                table: "ServiceCostCalculations",
                column: "ServiceCostId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
