using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DEEPLOM.Models
{
	public class User: IdentityUser
	{
		public string FirstName  { get; set; }
		public string LastName   { get; set; }
		public string MiddleName { get; set; }
		
		public virtual List<Director> Directors { get; set; }
		public virtual List<Student> Students { get; set; }
		public virtual List<Teacher> Teachers { get; set; }
	}
}