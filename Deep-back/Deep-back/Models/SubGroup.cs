
using System.Collections.Generic;

namespace DEEPLOM.Models
{
	public class SubGroup
	{
		public int ID { get; set; }
		public string Name { get; set; }
		
		public int GroupId { get; set; }
		public CollegeGroup Group { get; set; }
		
		public virtual List<Student> Students { get; set; }
	}
}