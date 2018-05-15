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
				               Date       = m.Lesson.Date.ToString("yyyy-MM-dd"),
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
		public async Task<IActionResult> PutMark([FromRoute] int id, [FromBody] Mark mark)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			if (id != mark.ID)
			{
				return BadRequest();
			}

			_context.Entry(mark).State = EntityState.Modified;

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
		public async Task<IActionResult> PostMark([FromBody] Mark mark)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			_context.Marks.Add(mark);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetMark", new {id = mark.ID}, mark);
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