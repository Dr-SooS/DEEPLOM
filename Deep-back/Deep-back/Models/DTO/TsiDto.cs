namespace DEEPLOM.Models
{
	public class TsiDto
	{
		public int Id { get; set; }
		public TeacherDTO Teacher { get; set; }
		public SubjectDTO Subject { get; set; }
		public SemesterDTO Semester { get; set; }
	}
}