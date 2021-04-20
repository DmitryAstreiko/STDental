using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using STDentalLibrary.Models.Enums;

namespace STDentalLibrary.Models
{
    public class Staff
    {
        public int StaffId { get; set; }

        public string Name { get; set; }

        [ForeignKey("PostId")]
        public Post Post { get; set; }

        public Role Role { get; set; }

        public StaffStatus StaffStatus { get; set; }

        public RenderService RenderService { get; set; }
        
        public StaffCredential StaffCredential { get; set; }

        public List<Talon> Talons { get; set; }
    }
}