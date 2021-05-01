using System;
using System.Collections.Generic;
using STDentalLibrary.Models.Enums;

namespace STDentalLibrary.Models.ModelsResponse
{
    public class TalonView
    {
        public string TalonId { get; set; }
        
        public string CreateDate { get; set; }

        public string Summa { get; set; }

        public string Cost { get; set; }
        
        public string PatientName { get; set; }

        public string StaffName { get; set; }

    }
}
