using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class AddDecriptionPatients : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NationalityId",
                table: "Patients",
                newName: "Nationality");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Patients");

            migrationBuilder.RenameColumn(
                name: "Nationality",
                table: "Patients",
                newName: "NationalityId");
        }
    }
}
