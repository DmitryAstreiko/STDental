using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STDentalLibrary.Models.Enums;

namespace STDentalLibrary.Models.ModelsResponse
{
    public class PatientInfo
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string City { get; set; }

        public string Street { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public DateTime DateBorn { get; set; }

        public string Nationality { get; set; }

        public string Description { get; set; }
    }
}
