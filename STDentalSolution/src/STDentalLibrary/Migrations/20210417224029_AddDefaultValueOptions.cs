using Microsoft.EntityFrameworkCore.Migrations;

namespace STDentalLibrary.Migrations
{
    public partial class AddDefaultValueOptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Options",
                columns: new[] { "OptionsId", "Description", "Name", "Value" },
                values: new object[,]
                {
                    { 1, "Полное наименование организации", "FullNameOrganization", "Открытое закрытое общество Рога и копыта" },
                    { 2, "Краткое наименование организации", "NameOrganization", "ОЗА Рога и копыта" },
                    { 3, "УНП организации", "UNP", "3223322" },
                    { 4, "Юридический адрес организации", "LegalAdress", "г. Минск, ул. Победы, 122" },
                    { 5, "Физический адрес организации", "PhysicalAdress", "г. Минск, ул. Маркса и Федора, 654'" },
                    { 6, "ФИО руководителя", "HeadFIO", "Усаче Длинный Васильевич" },
                    { 7, "Должность руководителя", "HeadPost", "Генеральный директор" },
                    { 8, "ФИО главного бухгалтера", "AccountantGeneral", "Жуков Гадя Петрович" },
                    { 9, "Наименование обслуживающего банка", "BankName", "ОАО Самый главный банк" },
                    { 10, "Расчетный счет организации", "BankAccount", "3112315315465168463513" },
                    { 11, "Адрес обслуживающего банка", "BankAdress", "г. Минск, ул. Бядули, 33" },
                    { 12, "БИК обслуживающего банка", "BankSWIFT", "XXYYXXYY" }
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
