using System;
using System.Collections.Generic;
using STDentalLibrary.Models.Enums;

namespace STDentalLibrary.Models
{
    public class Material
    {
        public int MaterialId { get; set; }

        public string Name { get; set; }

        public int UnitId { get; set; }

        public Unit Unit { get; set; }

        public DateTime CreateDate { get; set; }

        public decimal Price { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public List<ServiceMaterial> ServiceMaterials { get; set; }
    }
}