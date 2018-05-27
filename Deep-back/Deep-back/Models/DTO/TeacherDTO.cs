using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace DEEPLOM.Models
{
	public class TeacherDTO
	{
		public int ID { get; set; }
		public CollegeDTO College { get; set; }
		public UserDTO User { get; set; }
		public CollegeGroupDTO Group { get; set; }
	}
}