using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using STDentalLibrary.Models.Enums;

namespace STDentalLibrary.Models
{
    public class Service
    {
        public int ServiceId { get; set; }

        public string Name { get; set; }

        public string Shifr { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int UnitId { get; set; }

        public Unit Unit { get; set; }

        //public int ServiceCostId { get; set; }

        public ServiceCostCalculation ServiceCostCalculation { get; set; }

        public List<ServiceMaterial> ServiceMaterials { get; set; }

        public List<TalonService> TalonServices { get; set; }

        public List<GroupService> GroupServices { get; set; }
    }
}