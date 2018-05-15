using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DEEPLOM.Models
{
	public class Topic
	{
		public int ID { get; set; }
		public string Name { get; set; }
		
		public int SubjectId { get; set; }
		public Subject Subject { get; set; }
		
		public virtual List<Lesson> Lessons { get; set; }
	}
}