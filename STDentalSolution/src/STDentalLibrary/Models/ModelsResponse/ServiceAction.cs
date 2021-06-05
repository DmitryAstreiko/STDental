using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STDentalLibrary.Models.ModelsResponse
{
    public class ServiceAction
    {
        public int Id { get; set; }

        public string ServiceName { get; set; }

        public string Shifr { get; set; }

        public decimal? Price { get; set; }

        public int Amount { get; set; }

        public decimal? Cost { get; set; }
    }
}
