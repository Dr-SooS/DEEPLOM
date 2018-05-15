using System.Collections.Generic;

namespace DEEPLOM.Models
{
	public class SpecialtyDTO
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public CollegeDTO College { get; set; }
	}
}