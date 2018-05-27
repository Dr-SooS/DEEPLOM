using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DEEPLOM.Models
{
	public class LessonDTO
	{
		public int ID { get; set; }
		public string Date { get; set; }
		public TopicDTO Topic { get; set; }
	}
}