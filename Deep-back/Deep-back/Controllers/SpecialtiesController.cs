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
	[Route("api/Specialties")]
	public class SpecialtiesController : Controller
	{
		private readonly CollegeDbContext _context;

		public SpecialtiesController(CollegeDbContext context)
		{
			_context = context;
		}

		// GET: api/Specialties
		[HttpGet]
		public IEnumerable<SpecialtyDTO> GetSpecialties()
		{
			return _context.Specialties
			        .Include(s => s.College)
			        .Select(s => new SpecialtyDTO()
			        {
				        ID   = s.ID,
				        Name = s.Name,
				        College = new CollegeDTO()
				        {
					        ID   = s.College.ID,
					        Name = s.College.Name
				        }
			        })
			        .ToList();
		}

		[HttpGet("college/{collegeId}")]
		public IEnumerable<SpecialtyDTO> GetCollegeSpecialties([FromRoute] int collegeId)
		{
			return _context.Specialties
			               .Include(s => s.College)
			               .Select(s => new SpecialtyDTO()
			               {
				               ID   = s.ID,
				               Name = s.Name,
				               College = new CollegeDTO()
				               {
					               ID   = s.College.ID,
					               Name = s.College.Name
				               }
			               })
			               .Where(s => s.College.ID == collegeId)
			               .ToList();
		}

		// GET: api/Specialties/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetSpecialty([FromRoute] int id)
		{
			var specialty = await _context.Specialties
			                              .Include(s => s.College)
			                              .Select(s => new SpecialtyDTO()
			                              {
				                              ID   = s.ID,
				                              Name = s.Name,
				                              College = new CollegeDTO()
				                              {
					                              ID   = s.College.ID,
					                              Name = s.College.Name
				                              }
			                              })
			                              .SingleOrDefaultAsync(m => m.ID == id);

			if (specialty == null)
			{
				return NotFound();
			}

			return Ok(specialty);
		}

		// PUT: api/Specialties/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutSpecialty([FromRoute] int id, [FromBody] SpecialtyDTO specialtyDto)
		{
			if (id != specialtyDto.ID)
			{
				return BadRequest();
			}

			var specialty = await _context.Specialties.Include(s => s.College).FirstOrDefaultAsync(s => s.ID == specialtyDto.ID);
			specialty.CollegeId = specialtyDto.College.ID;
			specialty.Name      = specialtyDto.Name;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!SpecialtyExists(id))
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

		// POST: api/Specialties
		[HttpPost]
		public async Task<IActionResult> PostSpecialty([FromBody] SpecialtyDTO specialtyDto)
		{
			_context.Specialties.Add(new Specialty() {CollegeId = specialtyDto.College.ID, Name = specialtyDto.Name});
			await _context.SaveChangesAsync();

			return Ok();
		}

		// DELETE: api/Specialties/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteSpecialty([FromRoute] int id)
		{
			var specialty = await _context.Specialties.SingleOrDefaultAsync(m => m.ID == id);
			if (specialty == null)
			{
				return NotFound();
			}

			_context.Specialties.Remove(specialty);
			await _context.SaveChangesAsync();

			return Ok();
		}

		private bool SpecialtyExists(int id)
		{
			return _context.Specialties.Any(e => e.ID == id);
		}
	}
}