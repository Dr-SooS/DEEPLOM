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
	[Route("api/Students")]
	public class StudentsController : Controller
	{
		private readonly CollegeDbContext  _context;
		private readonly UserManager<User> _userManager;

		public StudentsController(CollegeDbContext context, UserManager<User> userManager)
		{
			_context     = context;
			_userManager = userManager;
		}

		// GET: api/Students
		[HttpGet]
		public IEnumerable<StudentDTO> GetStudents()
		{
			return _context.Students
			               .Include(s => s.SubGroup)
			               .ThenInclude(s => s.Group)
			               .Include(d => d.User)
			               .Select(s => new StudentDTO()
			               {
				               Id = s.ID,
				               SubGroup = new SubGroupDTO()
				               {
					               ID = s.SubGroupId,
					               Name = s.SubGroup.Name,
					               Group = new CollegeGroupDTO()
					               {
						               ID = s.SubGroup.GroupId,
						               Number = s.SubGroup.Group.Number
					               }
				               },
				               User = new UserDTO()
				               {
					               FirstName = s.User.FirstName,
					               LastName  = s.User.LastName,
					               Id        = s.User.Id,
					               Username  = s.User.UserName
				               }
			               })
			               .ToList();
		}
		
		[HttpGet("subgroup/{id}")]
		public IEnumerable<StudentDTO> GetSubGroupStudents([FromRoute] int id)
		{
			return _context.Students
			               .Include(s => s.SubGroup)
			               .ThenInclude(s => s.Group)
			               .Include(d => d.User)
			               .Where(s => s.SubGroupId == id)
			               .Select(s => new StudentDTO()
			               {
				               Id = s.ID,
				               SubGroup = new SubGroupDTO()
				               {
					               ID   = s.SubGroupId,
					               Name = s.SubGroup.Name,
					               Group = new CollegeGroupDTO()
					               {
						               ID     = s.SubGroup.GroupId,
						               Number = s.SubGroup.Group.Number
					               }
				               },
				               User = new UserDTO()
				               {
					               FirstName = s.User.FirstName,
					               LastName  = s.User.LastName,
					               Id        = s.User.Id,
					               Username  = s.User.UserName
				               }
			               })
			               .ToList();
		}

		// GET: api/Students/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetStudent([FromRoute] int id)
		{
			var student = await _context.Students
			                            .Include(d => d.User)
			                            .Include(d => d.SubGroup)
			                            .ThenInclude(s => s.Group)
			                            .Select(s => new StudentDTO()
			                            {
				                            Id = s.ID,
				                            SubGroup = new SubGroupDTO()
				                            {
					                            ID   = s.SubGroupId,
					                            Name = s.SubGroup.Name,
					                            Group = new CollegeGroupDTO()
					                            {
						                            ID     = s.SubGroup.GroupId,
						                            Number = s.SubGroup.Group.Number
					                            }
				                            },
				                            User = new UserDTO()
				                            {
					                            FirstName = s.User.FirstName,
					                            LastName  = s.User.LastName,
					                            Id        = s.User.Id,
					                            Username  = s.User.UserName
				                            }
			                            })
			                            .FirstOrDefaultAsync(m => m.Id == id);

			if (student == null)
			{
				return NotFound();
			}

			return Ok(student);
		}

		// PUT: api/Students/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutStudent([FromRoute] int id, [FromBody] StudentDTO studentDto)
		{
			if (id != studentDto.Id)
			{
				return BadRequest();
			}

			var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == studentDto.User.Id);
			user.FirstName = studentDto.User.FirstName;
			user.LastName  = studentDto.User.LastName;
			user.UserName  = studentDto.User.Username;

			var student  = await _context.Students.Include(d => d.SubGroup).FirstOrDefaultAsync(d => d.ID == studentDto.Id);
			student.SubGroupId = studentDto.SubGroup.ID;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!StudentExists(id))
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

		// POST: api/Students
		[HttpPost]
		public async Task<IActionResult> PostStudent([FromBody] StudentDTO studentDto)
		{
			var user = await UserUtils.CreateUser(_userManager, studentDto.User.Username, studentDto.User.Password, "Student");
			user.FirstName = studentDto.User.FirstName;
			user.LastName  = studentDto.User.LastName;
			user.UserName  = studentDto.User.Username;
			
			var student = _context.Students.Add(new Student() {User = user, SubGroupId = studentDto.SubGroup.ID}).Entity;
			await _context.SaveChangesAsync();

			return Ok();
		}

		// DELETE: api/Students/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteStudent([FromRoute] int id)
		{
			var student = await _context.Students.SingleOrDefaultAsync(m => m.ID == id);
			if (student == null)
			{
				return NotFound();
			}

			_context.Users.Remove(_context.Users.FirstOrDefault(u => u.Id == student.UserId));
			await _context.SaveChangesAsync();

			return Ok();
		}

		private bool StudentExists(int id)
		{
			return _context.Students.Any(e => e.ID == id);
		}
	}
}