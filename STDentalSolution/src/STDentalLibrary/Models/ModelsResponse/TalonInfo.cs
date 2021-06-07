using System;
using System.Collections.Generic;
using STDentalLibrary.Models.Enums;

namespace STDentalLibrary.Models.ModelsResponse
{
    public class TalonInfo
    {
        public int TalonId { get; set; }
        
        public DateTime CreateDate { get; set; }

        public decimal Summa { get; set; }

        public decimal Cost { get; set; }
        
        public string PatientName { get; set; }

        public int PatientId { get; set; }

        public string StaffName { get; set; }

        public int StaffId { get; set; }

        public string TalonStatus { get; set; }

        public string Description { get; set; }
    }
}
