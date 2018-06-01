using System;
using System.ComponentModel.DataAnnotations;

namespace DEEPLOM.Models
{
	public class Message
	{
		public int ID { get; set; }
		public string Topic { get; set; }
		public string Text { get; set; }
		public DateTime Date { get; set; }
		
		[Required]
		public string UserSenderId { get; set; }
		public User UserSender { get; set; }
		
		public int RecieverId { get; set; }
		public Reciever Reciever { get; set; }
	}
}