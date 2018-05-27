using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DEEPLOM.Models
{
	public class Director
	{
		public int ID { get; set; }

		public int? CollegeId { get; set; }
		public College College { get; set; }
		
		[Required]
		public string UserID { get; set; }
		public User User { get; set; }
	}
}