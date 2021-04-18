using System.Collections.Generic;

namespace STDentalLibrary.Models
{
    public class Post
    {
        public int PostId { get; set; }

        public string Name { get; set; }

        public List<Staff> Staffs { get; set; }
    }
}