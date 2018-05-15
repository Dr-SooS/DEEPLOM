namespace DEEPLOM.Models
{
	public class Mark
	{
		public int ID { get; set; }
		public int Value { get; set; }
		public bool IsAbsent { get; set; }
		public bool IsCredited { get; set; }
		
		public int LessonId { get; set; }
		public Lesson Lesson { get; set; }
		
		public int StudentId { get; set; }
		public Student Student { get; set; }
	}
}