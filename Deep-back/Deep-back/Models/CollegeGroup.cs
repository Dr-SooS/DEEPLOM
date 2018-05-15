using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DEEPLOM.Models
{
	public class CollegeGroup
	{
		public int ID { get; set; }
		public string Number { get; set; }
		
		public int SpecialtyId { get; set; }
		public Specialty Specialty { get; set; }
		 
		public int? CuratorId { get; set; }
		public Teacher Curator { get; set; }
		
		public virtual List<SubGroup> SubGroups { get; set; }
	}
}