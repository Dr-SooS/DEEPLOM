using System.ComponentModel.DataAnnotations;

namespace DEEPLOM.Models
{
	public class Reciever
	{
		public int ID { get; set; }
		
		[Required]
		public string UserRecieverId { get; set; }
		public User UserReciever { get; set; }
	}
}