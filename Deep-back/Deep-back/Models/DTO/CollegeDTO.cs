using System.Collections.Generic;
using System.IO;

namespace DEEPLOM.Models
{
	public class CollegeDTO
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public DirectorDTO Director { get; set; }
	}
}