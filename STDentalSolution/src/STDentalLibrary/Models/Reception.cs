using System;
using STDentalLibrary.Models.Enums;

namespace STDentalLibrary.Models
{
    public class Reception
    {
        public int ReceptionId { get; set; }

        public DateTime VisitDay { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string Comment { get; set; }

        public ReceptionStatus ReceptionStatus { get; set; }


        public int StaffId { get; set; }
        public Staff Staff { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}
