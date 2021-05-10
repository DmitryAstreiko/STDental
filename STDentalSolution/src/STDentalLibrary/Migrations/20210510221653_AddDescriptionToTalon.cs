using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class AddDescriptionToTalon : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupServices_GroupNameServices_GroupNameId",
                table: "GroupServices");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupServices_Services_GroupServiceId",
                table: "GroupServices");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Talons",
                type: "nvarchar(512)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupServices_GroupNameServices_GroupNameId",
                table: "GroupServices",
                column: "GroupNameId",
                principalTable: "GroupNameServices",
                principalColumn: "GroupNameId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupServices_Services_GroupServiceId",
                table: "GroupServices",
                column: "GroupServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupServices_GroupNameServices_GroupNameId",
                table: "GroupServices");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupServices_Services_GroupServiceId",
                table: "GroupServices");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Talons");

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
        }
    }
}
