using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STDentalLibrary.Models
{
    public class ServiceMaterial
    {
        public int ServiceMaterialId { get; set; }

        public decimal Price { get; set; }

        public decimal Norm { get; set; }

        public decimal Cost { get; set; }
        

        public int ServiceId { get; set; }
        public Service Service { get; set; }

        public int MaterialId { get; set; }
        public Material Material { get; set; }
    }
}
