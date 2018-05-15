using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DEEPLOM.Models
{
	public class Lesson
	{
		public int ID { get; set; }
		public DateTime Date { get; set; }
		
		public int TopicId { get; set; }
		public Topic Topic { get; set; }
		
		public int TeacherSubjectInfoId { get; set; }
		public TeacherSubjectInfo TeacherSubjectInfo { get; set; }
		
		public virtual List<Mark> Marks { get; set; }
	}
}