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
	[Route("api/Groups")]
	public class CollegeGroupsController : Controller
	{
		private readonly CollegeDbContext _context;

		public CollegeGroupsController(CollegeDbContext context)
		{
			_context = context;
		}

		// GET: api/CollegeGroups
		[HttpGet]
		public IEnumerable<CollegeGroupDTO> GetCollegeGroups()
		{
			return _context.CollegeGroups
			               .Include(g => g.Specialty)
			               .ThenInclude(s => s.College)
			               .Select(g => new CollegeGroupDTO()
			               {
				               ID     = g.ID,
				               Number = g.Number,
				               Specialty = new SpecialtyDTO()
				               {
					               ID   = g.SpecialtyId,
					               Name = g.Specialty.Name
				               }
			               })
			               .ToList();
		}

		[HttpGet("specialty/{id}")]
		public IEnumerable<CollegeGroupDTO> GetSpecialtyGroups([FromRoute] int id)
		{
			return _context.CollegeGroups
			        .Include(g => g.Specialty)
			        .ThenInclude(s => s.College)
			        .Select(g => new CollegeGroupDTO()
			        {
				        ID     = g.ID,
				        Number = g.Number,
				        Specialty = new SpecialtyDTO()
				        {
					        ID   = g.SpecialtyId,
					        Name = g.Specialty.Name
				        }
			        })
			        .Where(g => g.Specialty.ID == id)
			        .ToList();
		}

		// GET: api/CollegeGroups/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetCollegeGroup([FromRoute] int id)
		{
			var collegeGroup = await _context.CollegeGroups
			                                 .Include(g => g.Specialty)
			                                 .ThenInclude(s => s.College)
			                                 .Select(g => new CollegeGroupDTO()
			                                 {
				                                 ID     = g.ID,
				                                 Number = g.Number,
				                                 Specialty = new SpecialtyDTO()
				                                 {
					                                 ID   = g.SpecialtyId,
					                                 Name = g.Specialty.Name
				                                 }
			                                 })
			                                 .SingleOrDefaultAsync(m => m.ID == id);

			if (collegeGroup == null)
			{
				return NotFound();
			}

			return Ok(collegeGroup);
		}

		// PUT: api/CollegeGroups/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutCollegeGroup([FromRoute] int id, [FromBody] CollegeGroupDTO collegeGroupDto)
		{
			if (id != collegeGroupDto.ID)
			{
				return BadRequest();
			}

			var group = await _context.CollegeGroups.Include(g => g.Specialty).ThenInclude(s => s.College)
			                          .FirstOrDefaultAsync(g => g.ID == collegeGroupDto.ID);
			group.Number    = collegeGroupDto.Number;
			group.SpecialtyId = collegeGroupDto.Specialty.ID;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!CollegeGroupExists(id))
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

		// POST: api/CollegeGroups
		[HttpPost]
		public async Task<IActionResult> PostCollegeGroup([FromBody] CollegeGroupDTO collegeGroup)
		{
			_context.CollegeGroups.Add(new CollegeGroup()
			{
				ID     = collegeGroup.ID,
				Number = collegeGroup.Number,
				SpecialtyId = collegeGroup.Specialty.ID
			});
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateException)
			{
				if (CollegeGroupExists(collegeGroup.ID))
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

		// DELETE: api/CollegeGroups/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCollegeGroup([FromRoute] int id)
		{
			var collegeGroup = await _context.CollegeGroups.SingleOrDefaultAsync(m => m.ID == id);
			if (collegeGroup == null)
			{
				return NotFound();
			}

			_context.CollegeGroups.Remove(collegeGroup);
			await _context.SaveChangesAsync();

			return Ok();
		}

		private bool CollegeGroupExists(int id)
		{
			return _context.CollegeGroups.Any(e => e.ID == id);
		}
	}
}