namespace DEEPLOM.Models
{
	public class MessageDTO
	{
		public int    ID    { get; set; }
		public string Topic { get; set; }
		public string Text  { get; set; }
		public UserDTO UserSender   { get; set; }
		public UserDTO UserReciever   { get; set; }
	}
}