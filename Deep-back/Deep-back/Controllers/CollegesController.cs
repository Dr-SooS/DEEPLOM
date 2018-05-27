using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DEEPLOM.Models;
using DEEPLOM.Utils;
using Microsoft.AspNetCore.Identity;

namespace DEEPLOM.Controllers
{
	[Produces("application/json")]
	[Route("api/Colleges")]
	public class CollegesController : Controller
	{
		private readonly CollegeDbContext _context;
		public readonly UserManager<User> _userManager;

		public CollegesController(CollegeDbContext context, UserManager<User> userManager)
		{
			_context = context;
			_userManager = userManager;
		}

		// GET: api/Colleges
		[HttpGet]
		public IEnumerable<CollegeDTO> GetColleges()
		{
			return _context.Colleges
			               .Include(c => c.Director)
			               .Select(c => new CollegeDTO()
			               {
				               ID   = c.ID,
				               Name = c.Name,
				               Director = c.Director != null ? new DirectorDTO()
				               {
					               ID = c.Director.ID,
					               User = new UserDTO()
					               {
						               FirstName = c.Director.User.FirstName,
						               LastName  = c.Director.User.LastName,
						               Id        = c.Director.User.Id,
						               Username  = c.Director.User.UserName
					               }
				               } : null
			               })
			               .ToList();
		}

		[HttpGet]
		[Route("free")]
		public IEnumerable<CollegeDTO> GetFreeColleges()
		{
			
			return _context.Colleges
			               .Include(c => c.Director)
			               .ThenInclude(d => d.User)
			               .Where(c => c.Director == null)
			               .Select(c => new CollegeDTO()
			               {
				               ID   = c.ID,
				               Name = c.Name,
			               })
			               .ToList();
		}

		// GET: api/Colleges/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetCollege([FromRoute] int id)
		{
			var college = await _context.Colleges
			                            .Include(c => c.Director)
			                            .ThenInclude(d => d.User)
			                            .Select(c => new CollegeDTO()
			                            {
				                            ID   = c.ID,
				                            Name = c.Name,
				                            Director = c.Director != null ? new DirectorDTO()
				                            {
					                            ID = c.Director.ID,
					                            User = new UserDTO()
					                            {
						                            FirstName = c.Director.User.FirstName,
						                            LastName  = c.Director.User.LastName,
						                            Id        = c.Director.User.Id,
						                            Username  = c.Director.User.UserName
					                            }
				                            } : null
			                            })
			                            .SingleOrDefaultAsync(m => m.ID == id);

			if (college == null)
			{
				return NotFound();
			}

			return Ok(college);
		}

		// PUT: api/Colleges/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutCollege([FromRoute] int id, [FromBody] CollegeDTO collegeDto)
		{
			if (id != collegeDto.ID)
			{
				return BadRequest();
			}

			var college = await _context.Colleges.FirstOrDefaultAsync(c => c.ID == collegeDto.ID);
			college.Name = collegeDto.Name;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!CollegeExists(id))
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

		// POST: api/Colleges
		[HttpPost]
		public async Task<IActionResult> PostCollege([FromBody] CollegeDTO collegeDto)
		{
			var college = new College() {Name = collegeDto.Name};
			_context.Colleges.Add(college);
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateException)
			{
				if (CollegeExists(college.ID))
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

		// DELETE: api/Colleges/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCollege([FromRoute] int id)
		{
			var college = await _context.Colleges.SingleOrDefaultAsync(m => m.ID == id);
			if (college == null)
			{
				return NotFound();
			}

			_context.Colleges.Remove(college);
			await _context.SaveChangesAsync();

			return Ok();
		}

		private bool CollegeExists(int id)
		{
			return _context.Colleges.Any(e => e.ID == id);
		}
	}
}