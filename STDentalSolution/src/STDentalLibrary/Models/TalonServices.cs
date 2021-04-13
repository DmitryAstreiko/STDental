using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace STDentalLibrary.Models
{
    public class TalonService
    {
        public int TalonServiceId { get; set; }
        
        public decimal Price { get; set; }

        public int Amount { get; set; }

        public decimal Cost { get; set; }


        //public int ServiceId { get; set; }
        public Service Service { get; set; }

        //public int TalonId { get; set; }
        //public Talon Talon { get; set; }
    }
}
