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
	[Route("api/Semesters")]
	public class SemestersController : Controller
	{
		private readonly CollegeDbContext _context;

		public SemestersController(CollegeDbContext context)
		{
			_context = context;
		}

		// GET: api/Semesters
		[HttpGet]
		public IEnumerable<SemesterDTO> GetSemesters()
		{
			var semesters = new List<SemesterDTO>();
			foreach (var semester in _context.Semesters
			                                .Include(s => s.SubGroup)
			                                	.ThenInclude(s => s.Group)
			                                		.ThenInclude(g => g.Specialty)
			                                			.ThenInclude(s => s.College)
			                                .ToList())
				semesters.Add(DtoBuilder.BuildDto(semester));
			return semesters;
		}

		// GET: api/Semesters/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetSemester([FromRoute] int id)
		{
			var semester = await _context.Semesters
			                             .Include(s => s.SubGroup)
			                             .ThenInclude(s => s.Group)
			                             .ThenInclude(g => g.Specialty)
			                             .ThenInclude(s => s.College)
			                             .Select(s => new SemesterDTO()
			                             {
				                             ID = s.ID,
				                             Number = s.Number,
				                             StartDate = s.StartDate.ToString("yyyy-MM-dd"),
				                             EndDate = s.EndDate.ToString("yyyy-MM-dd")
			                             })
			                             .SingleOrDefaultAsync(m => m.ID == id);

			if (semester == null)
			{
				return NotFound();
			}

			return Ok(semester);
		}

		// PUT: api/Semesters/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutSemester([FromRoute] int id, [FromBody] SemesterDTO semesterDto)
		{
			if (id != semesterDto.ID)
			{
				return BadRequest();
			}

			var semester = await _context.Semesters.FirstOrDefaultAsync(c => c.ID == semesterDto.ID);
			semester.Number = semesterDto.Number;
			semester.EndDate = DateTime.ParseExact(semesterDto.EndDate, "yyyy-MM-dd", null);
			semester.StartDate = DateTime.ParseExact(semesterDto.StartDate, "yyyy-MM-dd", null);
			semester.SubGroupId = semesterDto.SubGroup.ID;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!SemesterExists(id))
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

		// POST: api/Semesters
		[HttpPost]
		public async Task<IActionResult> PostSemester([FromBody] SemesterDTO semesterDto)
		{
			var semester = new Semester()
			{
				Number = semesterDto.Number,
				EndDate = DateTime.ParseExact(semesterDto.EndDate, "yyyy-MM-dd", null),
				StartDate = DateTime.ParseExact(semesterDto.StartDate, "yyyy-MM-dd", null),
				SubGroupId = semesterDto.SubGroup.ID
			};
			_context.Semesters.Add(semester);
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateException)
			{
				if (SemesterExists(semester.ID))
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

		// DELETE: api/Semesters/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteSemester([FromRoute] int id)
		{
			var semester = await _context.Semesters.SingleOrDefaultAsync(m => m.ID == id);
			if (semester == null)
			{
				return NotFound();
			}

			_context.Semesters.Remove(semester);
			await _context.SaveChangesAsync();

			return Ok();
		}

		private bool SemesterExists(int id)
		{
			return _context.Semesters.Any(e => e.ID == id);
		}
	}
}