using System;
using System.Collections.Generic;
using STDentalLibrary.Models.Enums;

namespace STDentalLibrary.Models
{
    public class Talon
    {
        public int TalonId { get; set; }
        
        public DateTime CreateDate { get; set; }

        public DateTime ChangeDate { get; set; }

        public double Summa { get; set; }

        public int Sale { get; set; }

        public decimal SummaSale { get; set; }

        public decimal Cost { get; set; }

        public PaymentStatus PaymentStatus { get; set; }


        //public int PatientId { get; set; }
        //public Patient Patient { get; set; }

        //public int StaffId { get; set; }
        //public Staff Staff { get; set; }

       // public List<TalonService> TalonServices { get; set; }
    }
}
