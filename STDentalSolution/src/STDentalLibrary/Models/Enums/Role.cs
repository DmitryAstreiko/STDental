namespace STDentalLibrary.Models.Enums
{
    public enum Role
    {
        Undefined = 0,
        Admin = 1,  // полные права
        Cashier = 2, // администратор
        Doctor = 3, // врач
        Accountant = 4, // бухгалтер
        Head = 5 //руководитель
    }
}