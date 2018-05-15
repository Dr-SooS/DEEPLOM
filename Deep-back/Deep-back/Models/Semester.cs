using System;
using System.Collections.Generic;

namespace DEEPLOM.Models
{
	public class Semester
	{
		public int ID { get; set; }
		public int Number { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		
		public int? SubGroupId { get; set; }
		public SubGroup SubGroup { get; set; }
		
		public virtual List<TeacherSubjectInfo> TeacherSubjectInfos { get; set; }
	}
}