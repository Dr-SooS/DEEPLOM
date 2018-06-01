using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DEEPLOM.Models
{
	public class CollegeDbContext: IdentityDbContext<User>
	{	
		public DbSet<College> Colleges { get; set; }
		public DbSet<CollegeGroup> CollegeGroups { get; set; }
		public DbSet<Director> Directors { get; set; }
		public DbSet<Lesson> Lessons { get; set; }
		public DbSet<Mark> Marks { get; set; }
		public DbSet<Semester> Semesters { get; set; }
		public DbSet<Specialty> Specialties { get; set; }
		public DbSet<Student> Students { get; set; }
		public DbSet<SubGroup> SubGroups { get; set; }
		public DbSet<Subject> Subjects { get; set; }
		public DbSet<Teacher> Teachers { get; set; }
		public DbSet<TeacherSubjectInfo> TeacherSubjectInfos { get; set; }
		public DbSet<Topic> Topics { get; set; }
		public DbSet<Message> Messages { get; set; }
		public DbSet<Reciever> Recievers { get; set; }
		public DbSet<User> Users { get; set; }
		
		public CollegeDbContext(DbContextOptions options): base(options) {}
		
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
			=> optionsBuilder
					.UseMySql(@"Server=localhost;database=deeplomDb;uid=root;pwd=wsda1234;CharSet=utf8mb4");
	}
}