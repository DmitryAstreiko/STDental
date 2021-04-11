using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STDentalLibrary.Models
{
    public class Unit
    {
        public int UnitId { get; set; }

        public string Name { get; set; }

        public List<Service> Services { get; set; }

        public List<Material> Materials { get; set; }
    }
}
