using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DEEPLOM.Models;
using DEEPLOM.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
				var college = _context.Colleges.Add(new College {Name = "МРК"}).Entity;
				
				await UserUtils.CreateUser(_userManager, "admin@gmail.com", "_Wsda1234", "Admin");
				var director = await UserUtils.CreateUser(_userManager, "director@gmail.com", "_Wsda1234", "Director");
				director.FirstName = "Сергей";
				director.LastName = "Анкуда";
				
				var curator = await UserUtils.CreateUser(_userManager, "curator@gmail.com", "_Wsda1234", "Curator");
				curator.FirstName = "Елена";
				curator.LastName = "Клемято";
				
				var teacher = await UserUtils.CreateUser(_userManager, "teacher@gmail.com", "_Wsda1234", "Teacher");
				teacher.FirstName = "Марина";
				teacher.LastName = "Бельчик";
				
				var student = await UserUtils.CreateUser(_userManager, "student@gmail.com", "_Wsda1234", "Student");
				student.FirstName = "Владислав";
				student.LastName = "Добрицкий";
				
				var student1 = await UserUtils.CreateUser(_userManager, "student1@gmail.com", "_Wsda1234", "Student");
				student1.FirstName = "Андросов";
				student1.LastName  = "Павел";
				
				var student2 = await UserUtils.CreateUser(_userManager, "student2@gmail.com", "_Wsda1234", "Student");
				student2.FirstName = "Бубневич";
				student2.LastName  = "Илья";
				
				var student3 = await UserUtils.CreateUser(_userManager, "student3@gmail.com", "_Wsda1234", "Student");
				student3.FirstName = "Голодок";
				student3.LastName  = "Андрей";
				
				var student4 = await UserUtils.CreateUser(_userManager, "student4@gmail.com", "_Wsda1234", "Student");
				student4.FirstName = "Гуриш";
				student4.LastName  = "Елизавета";
				
				var student5= await UserUtils.CreateUser(_userManager, "student5@gmail.com", "_Wsda1234", "Student");
				student5.FirstName = "Зазаульничкий";
				student5.LastName  = "Дмитрий";
			
				
				var student7 = await UserUtils.CreateUser(_userManager, "studen7@gmail.com", "_Wsda1234", "Student");
				student7.FirstName = "Колышко";
				student7.LastName  = "Кирилл";
				
				var specialty = _context.Specialties.Add(new Specialty() {College = college, Name = "ПОИТ"}).Entity;
				var group = _context.CollegeGroups.Add(new CollegeGroup() {Number = "42491", Specialty = specialty}).Entity;
				var subGroup = _context.SubGroups.Add(new SubGroup() {Name = "42491sub1", Group = group}).Entity;

				_context.Directors.Add(new Director() {User = director, College = college});
				var s =_context.Students.Add(new Student() {User = student, SubGroup = subGroup}).Entity;
				
				_context.Students.Add(new Student() {User = student1, SubGroup = subGroup});
				_context.Students.Add(new Student() {User = student2, SubGroup = subGroup});
				_context.Students.Add(new Student() {User = student3, SubGroup = subGroup});
				_context.Students.Add(new Student() {User = student4, SubGroup = subGroup});
				_context.Students.Add(new Student() {User = student5, SubGroup = subGroup});
				_context.Students.Add(new Student() {User = student7, SubGroup = subGroup});
				
				var t = _context.Teachers.Add(new Teacher() {User = teacher, College = college}).Entity;
				_context.Teachers.Add(new Teacher() {User = curator, College = college});

				var semester = _context.Semesters.Add(new Semester()
				{
					Number    = 1,
					StartDate = new DateTime(2017, 9, 1),
					EndDate   = new DateTime(2017, 12, 24),
					SubGroup  = subGroup
				}).Entity;
				var subject = _context.Subjects.Add(new Subject() {Name = "КПиЯП", College = college}).Entity;
				var topic = _context.Topics.Add(new Topic() {Name = "Делегаты", Subject = subject}).Entity;
				_context.Topics.Add(new Topic() {Name = "Типы данных в C#", Subject = subject});
				_context.Topics.Add(new Topic() {Name = "Работа с массивами C#", Subject = subject});
				_context.Topics.Add(new Topic() {Name = "Основы ООП", Subject = subject});
				_context.Topics.Add(new Topic() {Name = "Практическая работа №1", Subject = subject});

				await _context.SaveChangesAsync();
				
				await new TeacheSubjectInfoController(_context).CreateTsi(new TsiDto()
				{
					Semester = new SemesterDTO() {ID = semester.ID},
					Subject  = new SubjectDTO() {ID = subject.ID},
					Teacher  = new TeacherDTO() {ID = t.ID}
				});

				var lesson1 = await _context.Lessons.FirstOrDefaultAsync(l => l.Date == new DateTime(2017, 09, 05));
				var lesson2 = await _context.Lessons.FirstOrDefaultAsync(l => l.Date == new DateTime(2017, 09, 06));
				var lesson3 = await _context.Lessons.FirstOrDefaultAsync(l => l.Date == new DateTime(2017, 09, 20));
				var lesson4 = await _context.Lessons.FirstOrDefaultAsync(l => l.Date == new DateTime(2017, 09, 21));
				var lesson5 = await _context.Lessons.FirstOrDefaultAsync(l => l.Date == new DateTime(2017, 10, 05));
				
				var mark1 = _context.Marks.Add(new Mark() {IsAbsent = false, IsCredited = false, Lesson = lesson1, Student = s, Value = 9}).Entity;
				var mark2 = _context.Marks.Add(new Mark() {IsAbsent = false, IsCredited = false, Lesson = lesson2, Student = s, Value = 9}).Entity;
				var mark3 = _context.Marks.Add(new Mark() {IsAbsent = false, IsCredited = false, Lesson = lesson3, Student = s, Value = 9}).Entity;
				var mark4 = _context.Marks.Add(new Mark() {IsAbsent = false, IsCredited = false, Lesson = lesson4, Student = s, Value = 9}).Entity;
				var mark5 = _context.Marks.Add(new Mark() {IsAbsent = false, IsCredited = false, Lesson = lesson5, Student = s, Value = 9}).Entity;

			}
			catch
			{
				return "Seeding Error";
			}

			await _context.SaveChangesAsync();

			return Ok("Seeding Success");
		}
	}
}