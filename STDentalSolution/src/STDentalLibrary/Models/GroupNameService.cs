using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STDentalLibrary.Models
{
    public class GroupNameService
    {
        public int GroupNameServiceId { get; set; }

        public string Name { get; set; }

        public List<GroupService> GroupServices { get; set; }
    }
}
