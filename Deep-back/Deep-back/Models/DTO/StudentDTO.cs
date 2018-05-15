using System.Collections.Generic;

namespace DEEPLOM.Models
{
	public class StudentDTO
	{
		public int      Id       { get; set; }
		public UserDTO     User     { get; set; }
		public SubGroupDTO SubGroup { get; set; }
	}
}