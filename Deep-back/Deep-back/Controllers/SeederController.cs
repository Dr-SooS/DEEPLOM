using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DEEPLOM.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DEEPLOM.Controllers
{
	[Produces("application/json")]
	[Route("api/Seeder")]
	public class SeederController : Controller
	{
		private readonly SignInManager<User>       _signInManager;
		private readonly UserManager<User>         _userManager;
		private readonly IConfiguration            _configuration;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly CollegeDbContext          _context;

		public SeederController(
			UserManager<User> userManager,
			SignInManager<User> signInManager,
			IConfiguration configuration,
			RoleManager<IdentityRole> roleManager,
			CollegeDbContext context
		)
		{
			_userManager   = userManager;
			_signInManager = signInManager;
			_configuration = configuration;
			_roleManager   = roleManager;
			_context       = context;
		}

		[HttpGet]
		public async Task<object> Seed()
		{
			await _context.Database.EnsureCreatedAsync();
			
			await _roleManager.CreateAsync(new IdentityRole("Admin"));
			await _roleManager.CreateAsync(new IdentityRole("Director"));
			await _roleManager.CreateAsync(new IdentityRole("Curator"));
			await _roleManager.CreateAsync(new IdentityRole("Teacher"));
			await _roleManager.CreateAsync(new IdentityRole("Student"));
			
			try
			{
				await CreateUser("admin@gmail.com", "_Wsda1234", "Admin");
				var director = await CreateUser("director@gmail.com", "_Wsda1234", "Director");
				director.FirstName = "Сергей";
				director.LastName = "Анкуда";
				
				var curator = await CreateUser("curator@gmail.com", "_Wsda1234", "Curator");
				curator.FirstName = "Елена";
				curator.LastName = "Клемято";
				
				var teacher = await CreateUser("teacher@gmail.com", "_Wsda1234", "Teacher");
				teacher.FirstName = "Марина";
				teacher.LastName = "Бельчик";
				
				var student = await CreateUser("student@gmail.com", "_Wsda1234", "Student");
				student.FirstName = "Владислав";
				student.LastName = "Добрицкий";
				
				var college = _context.Colleges.Add(new College {ID = 1, Name = "МРК"}).Entity;
				var specialty = _context.Specialties.Add(new Specialty() {College = college, Name = "ПОИТ"}).Entity;
				var group = _context.CollegeGroups.Add(new CollegeGroup() {Number = "42491", Specialty = specialty}).Entity;
				var subGroup = _context.SubGroups.Add(new SubGroup() {Name = "42491sub1", Group = group}).Entity;

				_context.Directors.Add(new Director() {User = director, College = college});
				_context.Students.Add(new Student() {User = student, SubGroup = subGroup});
				_context.Teachers.Add(new Teacher() {User = teacher, College = college});
				_context.Teachers.Add(new Teacher() {User = curator, College = college});
				
			}
			catch
			{
				return "Seeding Error";
			}

			await _context.SaveChangesAsync();

			return Ok("Seeding Success");
		}

		public async Task<User> CreateUser(string email, string password, string role)
		{
			var user   = new User() {Email = email, UserName = email};
			var result = await _userManager.CreateAsync(user, password);
			if (result.Succeeded)
			{
				await _userManager.AddToRoleAsync(user, role);
				return user;
			}

			throw new Exception("user creation error");
		}
	}
}