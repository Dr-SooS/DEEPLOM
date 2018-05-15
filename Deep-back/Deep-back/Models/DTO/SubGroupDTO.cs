
using System.Collections.Generic;

namespace DEEPLOM.Models
{
	public class SubGroupDTO
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public CollegeGroupDTO Group { get; set; }
	}
}