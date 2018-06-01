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
	[Route("api/Teachers")]
	public class TeachersController : Controller
	{
		private readonly CollegeDbContext  _context;
		private readonly UserManager<User> _userManager;

		public TeachersController(CollegeDbContext context, UserManager<User> userManager)
		{
			_context     = context;
			_userManager = userManager;
		}

		// GET: api/Teachers
		[HttpGet]
		public IEnumerable<TeacherDTO> GetTeachers()
		{
			return _context.Teachers
			               .Include(t => t.College)
			               .Include(t => t.User)
			               .Select(t => new TeacherDTO()
			               {
				               ID = t.ID,
				               College = new CollegeDTO()
				               {
					               ID   = t.CollegeId,
					               Name = t.College.Name
				               },
				               User = new UserDTO()
				               {
					               FirstName = t.User.FirstName,
					               LastName  = t.User.LastName,
					               Id        = t.User.Id,
					               Username  = t.User.UserName
				               }
			               }).ToList();
		}

		[HttpGet("college/{id}")]
		public IEnumerable<TeacherDTO> GetCollegeTeachers([FromRoute] int id)
		{
			return _context.Teachers
			               .Include(t => t.College)
			               .Include(t => t.User)
			               .Where(t => t.CollegeId == id)
			               .Select(t => new TeacherDTO()
			               {
				               ID = t.ID,
				               College = new CollegeDTO()
				               {
					               ID   = t.CollegeId,
					               Name = t.College.Name
				               },
				               User = new UserDTO()
				               {
					               FirstName = t.User.FirstName,
					               LastName  = t.User.LastName,
					               Id        = t.User.Id,
					               Username  = t.User.UserName
				               }
			               }).ToList();
		}

		[HttpGet("subGroup/{id}")]
		public IEnumerable<TeacherDTO> GetSubGroupTeachers([FromRoute] int id)
		{
			return _context.TeacherSubjectInfos
			               .Include(ts => ts.Teacher)
			               .Include(ts => ts.Semester)
			               .Where(ts => ts.Semester.SubGroupId == id)
			               .Select(ts => new TeacherDTO()
			               {
				               ID = ts.TeacherId,
				               College = new CollegeDTO()
				               {
					               ID   = ts.Teacher.CollegeId,
					               Name = ts.Teacher.College.Name
				               },
				               User = new UserDTO()
				               {
					               FirstName = ts.Teacher.User.FirstName,
					               LastName  = ts.Teacher.User.LastName,
					               Id        = ts.Teacher.User.Id,
					               Username  = ts.Teacher.User.UserName
				               }
			               })
			               .Distinct()
			               .ToList();
		}
		
		[HttpGet("user/{id}")]
		public async Task<IActionResult> GetTeacherByUser([FromRoute] string id)
		{
			var director = await _context.Teachers
			                             .Include(d => d.User)
			                             .Include(d => d.College)
			                             .Include(d => d.Group)
			                             .Select(d => new TeacherDTO()
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
				                             },
				                             Group = d.Group != null ? new CollegeGroupDTO()
				                             {
					                             ID = d.Group.ID,
					                             Number = d.Group.Number
				                             } : null
			                             }).FirstOrDefaultAsync(m => m.User.Id == id);

			if (director == null)
			{
				return NotFound();
			}

			return Ok(director);
		}

		// GET: api/Teachers/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetTeacher([FromRoute] int id)
		{
			var teacher = await _context.Teachers
			                            .Include(t => t.College)
			                            .Include(t => t.User)
			                            .Select(t => new TeacherDTO()
			                            {
				                            ID = t.ID,
				                            College = new CollegeDTO()
				                            {
					                            ID   = t.CollegeId,
					                            Name = t.College.Name
				                            },
				                            User = new UserDTO()
				                            {
					                            FirstName = t.User.FirstName,
					                            LastName  = t.User.LastName,
					                            Id        = t.User.Id,
					                            Username  = t.User.UserName
				                            }
			                            }).FirstOrDefaultAsync(m => m.ID == id);

			if (teacher == null)
			{
				return NotFound();
			}

			return Ok(teacher);
		}

		// PUT: api/Teachers/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTeacher([FromRoute] int id, [FromBody] TeacherDTO teacherDto)
		{
			if (id != teacherDto.ID)
			{
				return BadRequest();
			}

			var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == teacherDto.User.Id);
			user.FirstName = teacherDto.User.FirstName;
			user.LastName  = teacherDto.User.LastName;
			user.UserName  = teacherDto.User.Username;

			var teacher = await _context.Teachers.Include(t => t.Group).FirstOrDefaultAsync(d => d.ID == teacherDto.ID);
			teacher.CollegeId = teacherDto.College.ID;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!TeacherExists(id))
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

		// POST: api/Teachers
		[HttpPost]
		public async Task<IActionResult> PostTeacher([FromBody] TeacherDTO teacherDto)
		{
			var user = await UserUtils.CreateUser(_userManager, teacherDto.User.Username, teacherDto.User.Password, "Teacher");
			user.FirstName = teacherDto.User.FirstName;
			user.LastName  = teacherDto.User.LastName;
			user.UserName  = teacherDto.User.Username;

			var teacher = _context.Teachers.Add(new Teacher() {User = user, CollegeId = teacherDto.College.ID}).Entity;
			await _context.SaveChangesAsync();

			return Ok();
		}

		// DELETE: api/Teachers/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTeacher([FromRoute] int id)
		{
			var teacher = await _context.Teachers.SingleOrDefaultAsync(m => m.ID == id);
			if (teacher == null)
			{
				return NotFound();
			}

			_context.Users.Remove(_context.Users.FirstOrDefault(u => u.Id == teacher.UserId));
			await _context.SaveChangesAsync();

			return Ok();
		}

		private bool TeacherExists(int id)
		{
			return _context.Teachers.Any(e => e.ID == id);
		}
	}
}