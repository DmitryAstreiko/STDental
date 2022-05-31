using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class AddUnit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Units",
                columns: table => new
                {
                    UnitId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(32)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Units", x => x.UnitId);
                });

            migrationBuilder.InsertData(
                table: "Units",
                columns: new[] { "UnitId", "Name" },
                values: new object[,]
                {
                    { 1, "мл." },
                    { 2, "шт." },
                    { 3, "гр." },
                    { 4, "кг." },
                    { 5, "см." },
                    { 6, "карпула" },
                    { 7, "пар" },
                    { 8, "кв.см." },
                    { 9, "манипуляция" },
                    { 10, "процедура" },
                    { 11, "консультация" },
                    { 12, "обследование" },
                    { 13, "мм." },
                    { 14, "см.кв." },
                    { 15, "изделие" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Units");
        }
    }
}
