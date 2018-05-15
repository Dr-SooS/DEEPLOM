using DEEPLOM.Models;

namespace DEEPLOM.Utils
{
	public static class DtoBuilder
	{
		public static UserDTO BuildDto(User user)
		{
			return new UserDTO()
			{
				FirstName = user.FirstName,
				LastName  = user.LastName,
				Id        = user.Id,
				Username  = user.UserName
			};
		}

		public static CollegeDTO BuildDto(College college)
		{
			return new CollegeDTO() {ID = college.ID, Name = college.Name};
		}

		public static SpecialtyDTO BuildDto(Specialty specialty)
		{
			var collegeDto = BuildDto(specialty.College);
			return new SpecialtyDTO() {ID = specialty.ID, Name = specialty.Name, College = collegeDto};
		}

		public static CollegeGroupDTO BuildDto(CollegeGroup group)
		{
			var specialtyDto = BuildDto(group.Specialty);
			return new CollegeGroupDTO()
			{
				ID        = group.ID,
				Number    = group.Number,
				Specialty = specialtyDto
			};
		}

		public static SubGroupDTO BuildDto(SubGroup subGroup)
		{
			var group = BuildDto(subGroup.Group);
			return new SubGroupDTO() {ID = subGroup.ID, Name = subGroup.Name, Group = group};
		}


		public static SemesterDTO BuildDto(Semester semester)
		{
			return new SemesterDTO()
			{
				EndDate = semester.EndDate.ToString("yyyy-MM-dd"),
				StartDate = semester.StartDate.ToString("yyyy-MM-dd"),
				ID = semester.ID,
				Number = semester.Number,
				SubGroup = BuildDto(semester.SubGroup)
			};
		}


		public static SubjectDTO BuildDto(Subject subject)
		{
			return new SubjectDTO() {ID = subject.ID, Name = subject.Name};
		}
		
		public static TopicDTO BuildDto(Topic topic)
		{
			return new TopicDTO() {ID = topic.ID, Name = topic.Name};
		}
	}
}