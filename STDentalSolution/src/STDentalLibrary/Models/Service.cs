using System;
using STDentalLibrary.Models.Enums;

namespace STDentalLibrary.Models
{
    public class Service
    {
        public int ServiceId { get; set; }

        public string Name { get; set; }

        public string Shifr { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }


        //public int ServiceCostCalculationlId { get; set; }
        public ServiceCostCalculation ServiceCostCalculation { get; set; }
    }
}