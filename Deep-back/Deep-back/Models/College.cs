using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;

namespace DEEPLOM.Models
{
	public class College
	{
		public int ID { get; set; }
		public string Name { get; set; }
		
		public virtual List<Specialty> Specialties { get; set; }
		public virtual List<Subject> Subjects { get; set; }
		public Director Director { get; set; } 
		
		public virtual List<User> Users { get; set; }
	}
}