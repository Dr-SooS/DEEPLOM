using Microsoft.AspNetCore.Identity;

namespace DEEPLOM.Models
{
	public class UserDTO
	{
		public string Id         { get; set; }
		public string FirstName  { get; set; }
		public string LastName   { get; set; }
		public string MiddleName { get; set; }
		public string Username   { get; set; }
		public string Password   { get; set; }
		public string Role { get; set; }
	}
}