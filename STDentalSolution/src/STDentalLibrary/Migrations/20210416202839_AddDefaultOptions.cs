using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class AddDefaultOptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Options",
                columns: new[] { "OptionsId", "Name", "Value", "Description" },
                values: new object[,]
                {
                    { 1, "FullNameOrganization", "Открытое закрытое общество Рога и копыта", "Полное наименование организации" },
                    { 2, "NameOrganization", "ОЗА Рога и копыта", "Краткое наименование организации" },
                    { 3, "UNP", "3223322", "УНП организации" },
                    { 4, "LegalAdress", "г. Минск, ул. Победы, 122", "Юридический адрес организации" },
                    { 5, "PhysicalAdress", "г. Минск, ул. Маркса и Федора, 654'", "Физический адрес организации" },
                    { 6, "HeadFIO", "Усаче Длинный Васильевич", "ФИО руководителя" },
                    { 7, "HeadPost", "Генеральный директор", "Должность руководителя" },
                    { 8, "AccountantGeneral", "Жуков Гадя Петрович", "ФИО главного бухгалтера" },
                    { 9, "BankName", "ОАО Самый главный банк", "Наименование обслуживающего банка" },
                    { 10, "BankAccount", "3112315315465168463513", "Расчетный счет организации" },
                    { 11, "BankAdress", "г. Минск, ул. Бядули, 33", "Адрес обслуживающего банка" },
                    { 12, "BankSWIFT", "XXYYXXYY", "БИК обслуживающего банка" }
                });
        }
        
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionsId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionsId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionsId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionsId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionsId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionsId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionsId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionsId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionsId",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionsId",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionsId",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Options",
                keyColumn: "OptionsId",
                keyValue: 12);

        }
    }
}
