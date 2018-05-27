using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DEEPLOM.Models;
using DEEPLOM.Utils;

namespace DEEPLOM.Controllers
{
	[Produces("application/json")]
	[Route("api/Options")]
	public class OptionsController : Controller
	{
		public CollegeDbContext _context;

		public OptionsController(CollegeDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public Options GetOptions(int? teacherId, int? subjectId, int? semesterId, int? groupId)
		{
			var init = _context.TeacherSubjectInfos
			                   .Include(tsi => tsi.Teacher)
			                   .Include(tsi => tsi.Subject)
			                   .ThenInclude(s => s.College)
			                   .Include(tsi => tsi.Semester)
			                   .ThenInclude(s => s.SubGroup)
			                   .ThenInclude(sg => sg.Group);
			IQueryable<TeacherSubjectInfo> result = init;
			var sss = result.ToList();

			if (teacherId != null)
				result = init.Where(tsi => tsi.TeacherId == teacherId);

			if (subjectId != null)
				result = result.Where(tsi => tsi.SubjectId == subjectId);

			if (semesterId != null)
				result = result.Where(tsi => tsi.SemesterId == semesterId);

			if (groupId != null)
				result = result.Where(tsi => tsi.Semester.SubGroupId == groupId);


			return new Options(result);
		}
	}

	public class Options
	{
		public List<TeacherDTO>  Teachers  { get; set; }
		public List<SubjectDTO>  Subjects  { get; set; }
		public List<SemesterDTO> Semesters { get; set; }
		public List<SubGroupDTO> SubGroups { get; set; }

		public Options(IQueryable<TeacherSubjectInfo> result)
		{
			Teachers = result.Select(tsi => new TeacherDTO()
			{
				ID = tsi.TeacherId,
				College = new CollegeDTO()
				{
					ID   = tsi.Teacher.CollegeId,
					Name = tsi.Teacher.College.Name
				},
				User = new UserDTO()
				{
					FirstName = tsi.Teacher.User.FirstName,
					LastName  = tsi.Teacher.User.LastName,
					Id        = tsi.Teacher.User.Id,
					Username  = tsi.Teacher.User.UserName
				}
			}).Distinct().ToList();

			Semesters = result.Select(tsi => new SemesterDTO()
			{
				ID        = tsi.SemesterId,
				Number    = tsi.Semester.Number,
				StartDate = tsi.Semester.StartDate.ToString("yyyy-MM-dd"),
				EndDate   = tsi.Semester.EndDate.ToString("yyyy-MM-dd"),
				SubGroup = new SubGroupDTO()
				{
					ID   = tsi.Semester.SubGroupId,
					Name = tsi.Semester.SubGroup.Name
				}
			}).Distinct().ToList();

			SubGroups = result.Select(tsi => new SubGroupDTO()
			{
				ID   = tsi.Semester.SubGroupId,
				Name = tsi.Semester.SubGroup.Name,
				Group = new CollegeGroupDTO()
				{
					ID     = tsi.Semester.SubGroup.GroupId,
					Number = tsi.Semester.SubGroup.Group.Number
				}
			}).Distinct().ToList();

			Subjects = result.Select(tsi => new SubjectDTO()
			{
				ID   = tsi.SubjectId,
				Name = tsi.Subject.Name,
				College = new CollegeDTO()
				{
					ID   = tsi.Subject.CollegeId,
					Name = tsi.Subject.College.Name
				}
			}).Distinct().ToList();
		}
	}
}