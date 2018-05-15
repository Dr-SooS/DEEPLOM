using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DEEPLOM.Models
{
	public class LessonDTO
	{
		public int ID { get; set; }
		public DateTime Date { get; set; }
		public Topic Topic { get; set; }
	}
}