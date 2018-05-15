using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DEEPLOM.Models
{
	public class Student
	{
		public int ID { get; set; }
		
		public int SubGroupId { get; set; }
		public SubGroup SubGroup { get; set; }
		
		[Required]
		public string UserId { get; set; }
		public User User { get; set; }
		
		public virtual List<Mark> Marks { get; set; }
	}
}