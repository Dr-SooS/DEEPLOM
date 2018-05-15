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
	[Route("api/Subjects")]
	public class SubjectsController : Controller
	{
		private readonly CollegeDbContext _context;

		public SubjectsController(CollegeDbContext context)
		{
			_context = context;
		}

		// GET: api/Subjects
		[HttpGet]
		public IEnumerable<SubjectDTO> GetSubjects()
		{
			var subjects = new List<SubjectDTO>();
			foreach (var subject in _context.Subjects.ToList())
				subjects.Add(DtoBuilder.BuildDto(subject));
			return subjects;
		}

		// GET: api/Subjects/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetSubject([FromRoute] int id)
		{
			var subject = await _context.Subjects.SingleOrDefaultAsync(m => m.ID == id);

			if (subject == null)
			{
				return NotFound();
			}

			return Ok(DtoBuilder.BuildDto(subject));
		}

		// PUT: api/Subjects/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutSubject([FromRoute] int id, [FromBody] SubjectDTO subjectDto)
		{
			if (id != subjectDto.ID)
			{
				return BadRequest();
			}

			var subject = await _context.Subjects.FirstOrDefaultAsync(s => s.ID == subjectDto.ID);
			subject.Name = subjectDto.Name;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!SubjectExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return Ok();
		}

		// POST: api/Subjects
		[HttpPost]
		public async Task<IActionResult> PostSubject([FromBody] SubjectDTO subjectDto)
		{
			var subject = new Subject() {Name = subjectDto.Name};
			_context.Subjects.Add(subject);
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateException)
			{
				if (SubjectExists(subjectDto.ID))
				{
					return new StatusCodeResult(StatusCodes.Status409Conflict);
				}
				else
				{
					throw;
				}
			}

			return Ok();
		}

		// DELETE: api/Subjects/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteSubject([FromRoute] int id)
		{
			var subject = await _context.Subjects.SingleOrDefaultAsync(m => m.ID == id);
			if (subject == null)
			{
				return NotFound();
			}

			_context.Subjects.Remove(subject);
			await _context.SaveChangesAsync();

			return Ok();
		}

		private bool SubjectExists(int id)
		{
			return _context.Subjects.Any(e => e.ID == id);
		}
	}
}