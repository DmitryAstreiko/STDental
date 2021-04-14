using System;
using System.Reflection.Metadata;

namespace STDentalLibrary.Repositories
{
    public class PaymentForPeriod
    {
        public int TalonNumber { get; set; }

        public string PatientFIO { get; set; }

        public string StaffFIO { get; set; }

        //итого по талону
        public decimal Summa { get; set; }

        //итого со скидкой
        public decimal Cost { get; set; }

        public DateTime CreateDateTalon { get; set; }

        //остаток на день оплаты
        public decimal BalanceOfPayment { get; set; }

        //оплачено всего
        public decimal PaidTotal { get; set; }

        //дата последней оплаты
        public DateTime LastPaymentDay { get; set; }

        //задолженность
        public decimal Debt { get; set; }
    }

    public class TotalPaymentForPeriod
    {
        //итого по талону
        public decimal TotalPrice { get; set; }

        //итого со скидкой
        public decimal TotalCost { get; set; }

        //итого оплачено
        public decimal TotalPaid { get; set; }

        //итого задолженность
        public decimal TotalDebt { get; set; }
    }
}