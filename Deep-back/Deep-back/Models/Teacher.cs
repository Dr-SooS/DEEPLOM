using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DEEPLOM.Models
{
	public class Teacher
	{
		public int ID { get; set; }
		
		[Required]
		public string UserId { get; set; }
		public User User { get; set; }
		
		public CollegeGroup Group { get; set; }
		
		public int CollegeId { get; set; }
		public College College { get; set; }
		
		public virtual List<TeacherSubjectInfo> TeacherSubjectInfos { get; set; }
	}
}