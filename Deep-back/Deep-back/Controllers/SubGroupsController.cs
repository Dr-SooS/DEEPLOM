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
	[Route("api/SubGroups")]
	public class SubGroupsController : Controller
	{
		private readonly CollegeDbContext _context;

		public SubGroupsController(CollegeDbContext context)
		{
			_context = context;
		}

		// GET: api/SubGroups
		[HttpGet]
		public IEnumerable<SubGroupDTO> GetSubGroups()
		{
			return _context.SubGroups
			               .Include(s => s.Group)
			               .Select(g => new SubGroupDTO()
			               {
				               ID   = g.ID,
				               Name = g.Name,
				               Group = new CollegeGroupDTO()
				               {
					               ID     = g.GroupId,
					               Number = g.Group.Number
				               },
			               })
			               .ToList();
		}

		[HttpGet("group/{id}")]
		public IEnumerable<SubGroupDTO> GetGroupSubGroups([FromRoute] int id)
		{
			return _context.SubGroups
			               .Include(s => s.Group)
			               .Include(s => s.Students)
			               .ThenInclude(s => s.User)
			               .Select(g => new SubGroupDTO()
			               {
				               ID   = g.ID,
				               Name = g.Name,
				               Group = new CollegeGroupDTO()
				               {
					               ID     = g.GroupId,
					               Number = g.Group.Number
				               },

			               })
			               .Where(g => g.Group.ID == id)
			               .ToList();
		}
		
		[HttpGet("college/{id}")]
		public IEnumerable<SubGroupDTO> GetCollegeSubGroups([FromRoute] int id)
		{
			return _context.SubGroups
			               .Include(s => s.Group)
			               .ThenInclude(s => s.Specialty)
			               .Include(s => s.Students)
			               .ThenInclude(s => s.User)
			               .Where(g => g.Group.Specialty.CollegeId == id)
			               .Select(g => new SubGroupDTO()
			               {
				               ID   = g.ID,
				               Name = g.Name,
				               Group = new CollegeGroupDTO()
				               {
					               ID     = g.GroupId,
					               Number = g.Group.Number
				               },

			               })
			               .ToList();
		}

		// GET: api/SubGroups/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetSubGroup([FromRoute] int id)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var subGroup = await _context.SubGroups
			                             .Include(s => s.Group)
			                             .Include(s => s.Students)
			                             .ThenInclude(s => s.User)
			                             .Select(g => new SubGroupDTO()
			                             {
				                             ID   = g.ID,
				                             Name = g.Name,
				                             Group = new CollegeGroupDTO()
				                             {
					                             ID     = g.GroupId,
					                             Number = g.Group.Number
				                             }
			                             })
			                             .SingleOrDefaultAsync(m => m.ID == id);

			if (subGroup == null)
			{
				return NotFound();
			}

			return Ok(subGroup);
		}

		// PUT: api/SubGroups/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutSubGroup([FromRoute] int id, [FromBody] SubGroupDTO subGroupDto)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			if (id != subGroupDto.ID)
			{
				return BadRequest();
			}

			var subGroup = await _context.SubGroups.FirstOrDefaultAsync(s => s.ID == subGroupDto.ID);
			subGroup.Name    = subGroupDto.Name;
			subGroup.GroupId = subGroupDto.Group.ID;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!SubGroupExists(id))
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

		// POST: api/SubGroups
		[HttpPost]
		public async Task<IActionResult> PostSubGroup([FromBody] SubGroupDTO subGroupDto)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			_context.SubGroups.Add(new SubGroup() {Name = subGroupDto.Name, GroupId = subGroupDto.Group.ID});
			await _context.SaveChangesAsync();

			return Ok();
		}

		// DELETE: api/SubGroups/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteSubGroup([FromRoute] int id)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var subGroup = await _context.SubGroups.SingleOrDefaultAsync(m => m.ID == id);
			if (subGroup == null)
			{
				return NotFound();
			}

			_context.SubGroups.Remove(subGroup);
			await _context.SaveChangesAsync();

			return Ok(subGroup);
		}

		private bool SubGroupExists(int id)
		{
			return _context.SubGroups.Any(e => e.ID == id);
		}
	}
}