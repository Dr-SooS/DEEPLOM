using System;

namespace DEEPLOM.Models
{
	public class MarkDTO
	{
		public int ID { get; set; }
		public int Value { get; set; }
		public bool IsAbsent { get; set; }
		public bool IsCredited { get; set; }
		public StudentDTO Student { get; set; }
		public string Date { get; set; }
	}
}