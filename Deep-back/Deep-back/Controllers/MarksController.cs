using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DEEPLOM.Models;

namespace DEEPLOM.Controllers
{
	[Produces("application/json")]
	[Route("api/Marks")]
	public class MarksController : Controller
	{
		private readonly CollegeDbContext _context;

		public MarksController(CollegeDbContext context)
		{
			_context = context;
		}

		// GET: api/Marks
		[HttpGet]
		public IEnumerable<Mark> GetMarks()
		{
			return _context.Marks;
		}

		[HttpGet("byTsi")]
		public async Task<IActionResult> GetMarksByTsi(int tsiId)
		{
			var baseTsi = await _context.TeacherSubjectInfos.FirstOrDefaultAsync(tsi => tsi.ID == tsiId);
			return Ok(_context.Marks
			               .Include(m => m.Lesson)
			               .ThenInclude(l => l.TeacherSubjectInfo)
			               .ThenInclude(ts => ts.Semester)
			               .Include(m => m.Lesson)
			               .ThenInclude(l => l.TeacherSubjectInfo)
			               .ThenInclude(ts => ts.Subject)
			               .Include(m => m.Lesson)
			               .ThenInclude(l => l.TeacherSubjectInfo)
			               .ThenInclude(ts => ts.Teacher)
			               .Include(m => m.Student)
			               .ThenInclude(s => s.User)
			               .Where(
				               m => m.Lesson.TeacherSubjectInfo.SubjectId == baseTsi.SubjectId &&
				                    m.Lesson.TeacherSubjectInfo.SemesterId == baseTsi.SemesterId &&
				                    m.Lesson.TeacherSubjectInfo.TeacherId == baseTsi.TeacherId)
			               .Select(m => new MarkDTO()
			               {
				               ID         = m.ID,
				               IsAbsent   = m.IsAbsent,
				               IsCredited = m.IsCredited,
				               Value      = m.Value,
				               Lesson = new LessonDTO()
				               {
					               ID   = m.LessonId,
					               Date = m.Lesson.Date.ToString("yyyy-MM-dd"),
				               },
				               Student = new StudentDTO()
				               {
					               Id = m.StudentId,
					               User = new UserDTO()
					               {
						               Id        = m.Student.UserId,
						               FirstName = m.Student.User.FirstName,
						               LastName  = m.Student.User.LastName
					               }
				               }
			               }).ToList());
		}
		
		[HttpGet("notall")]
		public IEnumerable<MarkDTO> GetMarks(int subjectId, int semesterId, int teacherId)
		{
			return _context.Marks
			               .Include(m => m.Lesson)
			               .ThenInclude(l => l.TeacherSubjectInfo)
			               .ThenInclude(ts => ts.Semester)
			               .Include(m => m.Lesson)
			               .ThenInclude(l => l.TeacherSubjectInfo)
			               .ThenInclude(ts => ts.Subject)
			               .Include(m => m.Lesson)
			               .ThenInclude(l => l.TeacherSubjectInfo)
			               .ThenInclude(ts => ts.Teacher)
			               .Include(m => m.Student)
			               .ThenInclude(s => s.User)
			               .Where(
				               m => m.Lesson.TeacherSubjectInfo.SubjectId == subjectId &&
				                    m.Lesson.TeacherSubjectInfo.SemesterId == semesterId &&
				                    m.Lesson.TeacherSubjectInfo.TeacherId == teacherId)
			               .Select(m => new MarkDTO()
			               {
				               ID         = m.ID,
				               IsAbsent   = m.IsAbsent,
				               IsCredited = m.IsCredited,
				               Value      = m.Value,
				               Lesson = new LessonDTO()
				               {
					               ID   = m.LessonId,
					               Date = m.Lesson.Date.ToString("yyyy-MM-dd"),
				               },
				               Student = new StudentDTO()
				               {
					               Id = m.StudentId,
					               User = new UserDTO()
					               {
						               Id        = m.Student.UserId,
						               FirstName = m.Student.User.FirstName,
						               LastName  = m.Student.User.LastName
					               }
				               }
			               }).ToList();
		}

		// GET: api/Marks/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetMark([FromRoute] int id)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var mark = await _context.Marks.SingleOrDefaultAsync(m => m.ID == id);

			if (mark == null)
			{
				return NotFound();
			}

			return Ok(mark);
		}

		// PUT: api/Marks/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutMark([FromRoute] int id, [FromBody] MarkDTO markDto)
		{
			var mark = await _context.Marks.FirstOrDefaultAsync(m => m.ID == id);
			mark.IsAbsent   = markDto.IsAbsent;
			mark.IsCredited = markDto.IsCredited;
			mark.Value      = markDto.Value;
			mark.StudentId  = markDto.Student.Id;
			mark.LessonId   = markDto.Lesson.ID;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!MarkExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// POST: api/Marks
		[HttpPost]
		public async Task<IActionResult> PostMark([FromBody] MarkDTO markDto)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			_context.Marks.Add(new Mark()
			{
				IsAbsent   = markDto.IsAbsent,
				IsCredited = markDto.IsCredited,
				Value      = markDto.Value,
				LessonId   = markDto.Lesson.ID,
				StudentId  = markDto.Student.Id
			});
			await _context.SaveChangesAsync();

			return Ok();
		}

		// DELETE: api/Marks/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteMark([FromRoute] int id)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var mark = await _context.Marks.SingleOrDefaultAsync(m => m.ID == id);
			if (mark == null)
			{
				return NotFound();
			}

			_context.Marks.Remove(mark);
			await _context.SaveChangesAsync();

			return Ok(mark);
		}

		private bool MarkExists(int id)
		{
			return _context.Marks.Any(e => e.ID == id);
		}
	}
}