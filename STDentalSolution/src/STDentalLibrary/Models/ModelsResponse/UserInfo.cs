using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STDentalLibrary.Models.ModelsResponse
{
    public class UserInfo
    {
        public int Id { get; set; }

        public string User { get; set; }

        public Enums.Role Role { get; set; }
    }
}
