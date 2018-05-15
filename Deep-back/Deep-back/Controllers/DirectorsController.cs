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
using Microsoft.AspNetCore.ResponseCaching.Internal;

namespace DEEPLOM.Controllers
{
	[Produces("application/json")]
	[Route("api/Directors")]
	public class DirectorsController : Controller
	{
		private readonly CollegeDbContext  _context;
		private readonly UserManager<User> _userManager;

		public DirectorsController(CollegeDbContext context, UserManager<User> userManager)
		{
			_context     = context;
			_userManager = userManager;
		}

		// GET: api/Directors
		[HttpGet]
		public IEnumerable<DirectorDTO> GetDirectors()
		{
			return _context.Directors
			        .Include(d => d.User)
			        .Include(d => d.College)
			        .Select(d => new DirectorDTO()
			        {
				        ID = d.ID,
				        College = d.College != null
					        ? new CollegeDTO()
					        {
						        ID   = d.College.ID,
						        Name = d.College.Name
					        }
					        : null,
				        User = new UserDTO()
				        {
					        FirstName = d.User.FirstName,
					        LastName  = d.User.LastName,
					        Id        = d.User.Id,
					        Username  = d.User.UserName
				        }
			        }).ToList();
		}

		// GET: api/Directors/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetDirector([FromRoute] int id)
		{
			var director = await _context.Directors
			                             .Include(d => d.User)
			                             .Include(d => d.College)
			                             .Select(d => new DirectorDTO()
			                             {
				                             ID = d.ID,
				                             College = d.College != null ? new CollegeDTO()
				                             {
					                             ID   = d.College.ID,
					                             Name = d.College.Name
				                             } : null,
				                             User = new UserDTO()
				                             {
					                             FirstName = d.User.FirstName,
					                             LastName  = d.User.LastName,
					                             Id        = d.User.Id,
					                             Username  = d.User.UserName
				                             }
			                             }).FirstOrDefaultAsync(m => m.ID == id);

			if (director == null)
			{
				return NotFound();
			}

			return Ok(director);
		}

		// PUT: api/Directors/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutDirector([FromRoute] int id, [FromBody] DirectorDTO directorDto)
		{
			if (id != directorDto.ID)
			{
				return BadRequest();
			}

			var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == directorDto.User.Id);
			user.FirstName = directorDto.User.FirstName;
			user.LastName  = directorDto.User.LastName;
			user.UserName = directorDto.User.Username;
			
			var director = await _context.Directors.Include(d => d.College).FirstOrDefaultAsync(d => d.ID == directorDto.ID);
			director.CollegeId = directorDto.College.ID;
			
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!DirectorExists(id))
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

		// POST: api/Directors
		[HttpPost]
		public async Task<IActionResult> PostDirector([FromBody] DirectorDTO directorDto)
		{
			var user = await UserCreator.CreateUser(_userManager, directorDto.User.Username, directorDto.User.Password, "Director");
			user.FirstName = directorDto.User.FirstName;
			user.LastName = directorDto.User.LastName;
			user.UserName = directorDto.User.Username;
			_context.Directors.Add(new Director() { User = user });
			await _context.SaveChangesAsync();

			return Ok();
		}

		// DELETE: api/Directors/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteDirector([FromRoute] int id)
		{
			var director = await _context.Directors.SingleOrDefaultAsync(m => m.ID == id);
			if (director == null)
			{
				return NotFound();
			}
			
			_context.Users.Remove(_context.Users.FirstOrDefault(u => u.Id == director.UserID));
			await _context.SaveChangesAsync();

			return Ok();
		}

		private bool DirectorExists(int id)
		{
			return _context.Directors.Any(e => e.ID == id);
		}
	}
}