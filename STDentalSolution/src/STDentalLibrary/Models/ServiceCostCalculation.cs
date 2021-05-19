using System.ComponentModel.DataAnnotations.Schema;

namespace STDentalLibrary.Models
{
    public class ServiceCostCalculation
    {
        public int ServiceCostId { get; set; }

        public decimal WorkCost { get; set; }

        public decimal MaterialsCost { get; set; }

        public decimal Summa { get; set; }

        public int Sale { get; set; }

        public decimal SummaSales { get; set; }

        public decimal Cost { get; set; }
        
        public int ServiceId { get; set; }

        public Service Service { get; set; }
    }
}