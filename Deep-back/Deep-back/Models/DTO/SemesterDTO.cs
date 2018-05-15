using System;
using System.Collections.Generic;

namespace DEEPLOM.Models
{
	public class SemesterDTO
	{
		public int ID { get; set; }
		public int Number { get; set; }
		public string StartDate { get; set; }
		public string EndDate { get; set; }
		public SubGroupDTO SubGroup { get; set; }
	}
}