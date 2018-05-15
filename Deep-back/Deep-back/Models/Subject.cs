using System.Collections.Generic;

namespace DEEPLOM.Models
{
	public class Subject
	{
		public int ID { get; set; }
		public string Name { get; set; }
		
		public int CollegeId { get; set; }
		public College College { get; set; }
		
		public virtual List<TeacherSubjectInfo> TeacherSubjectInfos { get; set; }
	}
}