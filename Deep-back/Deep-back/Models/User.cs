using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DEEPLOM.Models
{
	public class User: IdentityUser
	{
		public string FirstName  { get; set; }
		public string LastName   { get; set; }
		public string MiddleName { get; set; }
		
		public Director Director { get; set; }
	}
}