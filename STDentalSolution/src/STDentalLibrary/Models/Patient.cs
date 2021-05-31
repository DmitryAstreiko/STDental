using System;
using System.Collections.Generic;
using STDentalLibrary.Models.Enums;

namespace STDentalLibrary.Models
{
    public class Patient
    {
        public int PatientId { get; set; }
        
        public string Name { get; set; }

        public string City { get; set; }

        public string Street { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public DateTime DateBorn { get; set; }

        public Nationality Nationality { get; set; }

        public string Description { get; set; }

        public List<Talon> Talons { get; set; }

        public List<Reception> Receptions { get; set; }
    }
}
