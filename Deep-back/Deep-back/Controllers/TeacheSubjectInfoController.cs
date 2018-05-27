using System.Linq;
using System.Threading.Tasks;
using DEEPLOM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DEEPLOM.Controllers
{
	[Produces("application/json")]
	[Route("api/TSIs")]
	public class TeacheSubjectInfoController : Controller
	{
		private CollegeDbContext _context;

		public TeacheSubjectInfoController(CollegeDbContext _context)
		{
			this._context = _context;
		}

		[HttpPost]
		public async Task<IActionResult> CreateTsi([FromBody] TsiDto tsiDto)
		{
			var tsi = _context.TeacherSubjectInfos.Add(new TeacherSubjectInfo()
			{
				SemesterId = tsiDto.Semester.ID,
				SubjectId  = tsiDto.Subject.ID,
				TeacherId  = tsiDto.Teacher.ID,
			}).Entity;

			var semester = await _context.Semesters.FirstOrDefaultAsync(s => s.ID == tsiDto.Semester.ID);

			var date = semester.StartDate;

			while (date <= semester.EndDate)
			{
				_context.Lessons.Add(new Lesson() {Date = date, TeacherSubjectInfoId = tsi.ID});
				date = date.AddDays(1);
			}

			await _context.SaveChangesAsync();

			return Ok();
		}

		[HttpGet("teacher/{id}")]
		public async Task<IActionResult> GetTeacherTsi([FromRoute] int id)
		{
			return Ok(_context.TeacherSubjectInfos
			                  .Include(tsi => tsi.Subject)
			                  .Include(tsi => tsi.Teacher)
			                  .ThenInclude(t => t.User)
			                  .Include(tsi => tsi.Semester)
			                  .ThenInclude(s => s.SubGroup)
			                  .Where(tsi => tsi.TeacherId == id)
			                  .Select(tsi => new TsiDto()
			                  {
				                  Id = tsi.ID,
				                  Semester = new SemesterDTO()
				                  {
					                  ID     = tsi.SemesterId,
					                  Number = tsi.Semester.Number,
					                  SubGroup = new SubGroupDTO()
					                  {
						                  ID   = tsi.Semester.SubGroupId,
						                  Name = tsi.Semester.SubGroup.Name
					                  }
				                  },
				                  Subject = new SubjectDTO()
				                  {
					                  ID = tsi.SubjectId,
					                  Name = tsi.Subject.Name
				                  },
				                  Teacher = new TeacherDTO()
				                  {
					                  ID = tsi.Teacher.ID,
					                  User = new UserDTO()
					                  {
						                  FirstName = tsi.Teacher.User.FirstName,
						                  LastName  = tsi.Teacher.User.LastName,
						                  Id        = tsi.Teacher.User.Id,
						                  Username  = tsi.Teacher.User.UserName
					                  }
				                  }
			                  }));
		}
		
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTsi([FromRoute] int id)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var tsi = await _context.TeacherSubjectInfos.SingleOrDefaultAsync(m => m.ID == id);
			if (tsi == null)
			{
				return NotFound();
			}

			_context.TeacherSubjectInfos.Remove(tsi);
			await _context.SaveChangesAsync();

			return Ok(tsi);
		}
	}
}