using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class AddGroupName_GroupService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GroupNameService",
                columns: table => new
                {
                    GroupNameId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(150)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupNameService", x => x.GroupNameId);
                });

            migrationBuilder.CreateTable(
                name: "GroupService",
                columns: table => new
                {
                    GroupServiceId = table.Column<int>(type: "int", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    GroupNameId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupService", x => x.GroupServiceId);
                    table.ForeignKey(
                        name: "FK_GroupService_GroupNameService_GroupNameId",
                        column: x => x.GroupNameId,
                        principalTable: "GroupNameService",
                        principalColumn: "GroupNameId");
                    table.ForeignKey(
                        name: "FK_GroupService_Services_GroupServiceId",
                        column: x => x.GroupServiceId,
                        principalTable: "Services",
                        principalColumn: "ServiceId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupService_GroupNameId",
                table: "GroupService",
                column: "GroupNameId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupService");

            migrationBuilder.DropTable(
                name: "GroupNameService");
        }
    }
}
