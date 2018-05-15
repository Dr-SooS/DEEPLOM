using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

namespace DEEPLOM.Models
{
	public class TeacherSubjectInfo
	{
		public int ID { get; set; }
		
		public int SubjectId { get; set; }
		public Subject Subject { get; set; }
		
		public int TeacherId { get; set; }
		public Teacher Teacher { get; set; }
		
		public int SemesterId { get; set; }
		public Semester Semester { get; set; }
		
		public virtual List<Lesson> Lessons { get; set; }
	}
}