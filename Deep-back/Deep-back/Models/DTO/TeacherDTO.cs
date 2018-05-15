using System.Collections.Generic;

namespace DEEPLOM.Models
{
	public class TeacherDTO
	{
		public int ID { get; set; }
		public CollegeDTO College { get; set; }
		public UserDTO User { get; set; }
	}
}