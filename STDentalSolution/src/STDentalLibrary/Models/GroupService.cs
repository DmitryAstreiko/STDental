using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STDentalLibrary.Models
{
    public class GroupService
    {
        public int GroupServiceId { get; set; }

        public int ServiceId { get; set; }
        public Service Service { get; set; }

        public int GroupNameId { get; set; }
        public GroupNameService GroupName { get; set; }
    }
}
