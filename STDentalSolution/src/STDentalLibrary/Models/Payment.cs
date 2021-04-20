using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STDentalLibrary.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }
        
        public decimal AmountBefore { get; set; }

        public decimal PaymentAmount { get; set; }

        public decimal Dept { get; set; }

        public decimal PaidTotal { get; set; }

        public DateTime PaymentDate { get; set; }

        public DateTime CreateDate { get; set; }

        public int TalonId { get; set; }
        public Talon Talon { get; set; }
    }
}
