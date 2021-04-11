namespace STDentalLibrary.Models.Enums
{
    public enum Role
    {
        Undefined = 0,
        Admin = 1,  // полные права
        Cashier = 2, // выписка талонов, прием оплаты
        Doctor = 3, //выписка талонов
        Accountant = 4 //отчеты
    }
}