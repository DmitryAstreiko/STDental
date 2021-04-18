using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace STDentalLibrary.Models
{
    public class StaffCredential
    {
        [Column("UserLogin")]
        [DataType("nvarchar(30)")]
        public string UserLogin { get; set; }

        [Column("UserPass")]
        [DataType("nvarchar(30)")]
        public string UserPass { get; set; }
    }
}