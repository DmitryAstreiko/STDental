using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STDentalLibrary.Models.Report
{
    public class DeptOfDate
    {
        public Talon Talon { get; set; }

        public Staff Staff { get; set; }

        public Patient Patient { get; set; }

        public Payment Payment { get; set; }
    }
}
