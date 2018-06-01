﻿// <auto-generated />
using DEEPLOM.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace Deepback.Migrations
{
    [DbContext(typeof(CollegeDbContext))]
    partial class CollegeDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026");

            modelBuilder.Entity("DEEPLOM.Models.College", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.ToTable("Colleges");
                });

            modelBuilder.Entity("DEEPLOM.Models.CollegeGroup", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CuratorId");

                    b.Property<string>("Number");

                    b.Property<int>("SpecialtyId");

                    b.HasKey("ID");

                    b.HasIndex("CuratorId")
                        .IsUnique();

                    b.HasIndex("SpecialtyId");

                    b.ToTable("CollegeGroups");
                });

            modelBuilder.Entity("DEEPLOM.Models.Director", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CollegeId");

                    b.Property<string>("UserID")
                        .IsRequired();

                    b.HasKey("ID");

                    b.HasIndex("CollegeId")
                        .IsUnique();

                    b.HasIndex("UserID");

                    b.ToTable("Directors");
                });

            modelBuilder.Entity("DEEPLOM.Models.Lesson", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<int>("TeacherSubjectInfoId");

                    b.Property<int?>("TopicId");

                    b.HasKey("ID");

                    b.HasIndex("TeacherSubjectInfoId");

                    b.HasIndex("TopicId");

                    b.ToTable("Lessons");
                });

            modelBuilder.Entity("DEEPLOM.Models.Mark", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsAbsent");

                    b.Property<bool>("IsCredited");

                    b.Property<int>("LessonId");

                    b.Property<int>("StudentId");

                    b.Property<int?>("Value");

                    b.HasKey("ID");

                    b.HasIndex("LessonId");

                    b.HasIndex("StudentId");

                    b.ToTable("Marks");
                });

            modelBuilder.Entity("DEEPLOM.Models.Message", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<int>("RecieverId");

                    b.Property<string>("Text");

                    b.Property<string>("Topic");

                    b.Property<string>("UserSenderId")
                        .IsRequired();

                    b.HasKey("ID");

                    b.HasIndex("RecieverId");

                    b.HasIndex("UserSenderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("DEEPLOM.Models.Reciever", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("UserRecieverId")
                        .IsRequired();

                    b.HasKey("ID");

                    b.HasIndex("UserRecieverId");

                    b.ToTable("Recievers");
                });

            modelBuilder.Entity("DEEPLOM.Models.Semester", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("EndDate");

                    b.Property<int>("Number");

                    b.Property<DateTime>("StartDate");

                    b.Property<int>("SubGroupId");

                    b.HasKey("ID");

                    b.HasIndex("SubGroupId");

                    b.ToTable("Semesters");
                });

            modelBuilder.Entity("DEEPLOM.Models.Specialty", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CollegeId");

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.HasIndex("CollegeId");

                    b.ToTable("Specialties");
                });

            modelBuilder.Entity("DEEPLOM.Models.Student", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("SubGroupId");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("ID");

                    b.HasIndex("SubGroupId");

                    b.HasIndex("UserId");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("DEEPLOM.Models.SubGroup", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("GroupId");

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.HasIndex("GroupId");

                    b.ToTable("SubGroups");
                });

            modelBuilder.Entity("DEEPLOM.Models.Subject", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CollegeId");

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.HasIndex("CollegeId");

                    b.ToTable("Subjects");
                });

            modelBuilder.Entity("DEEPLOM.Models.Teacher", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CollegeId");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("ID");

                    b.HasIndex("CollegeId");

                    b.HasIndex("UserId");

                    b.ToTable("Teachers");
                });

            modelBuilder.Entity("DEEPLOM.Models.TeacherSubjectInfo", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("SemesterId");

                    b.Property<int>("SubjectId");

                    b.Property<int>("TeacherId");

                    b.HasKey("ID");

                    b.HasIndex("SemesterId");

                    b.HasIndex("SubjectId");

                    b.HasIndex("TeacherId");

                    b.ToTable("TeacherSubjectInfos");
                });

            modelBuilder.Entity("DEEPLOM.Models.Topic", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("SubjectId");

                    b.HasKey("ID");

                    b.HasIndex("SubjectId");

                    b.ToTable("Topics");
                });

            modelBuilder.Entity("DEEPLOM.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<int?>("CollegeID");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("MiddleName");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("CollegeID");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("DEEPLOM.Models.CollegeGroup", b =>
                {
                    b.HasOne("DEEPLOM.Models.Teacher", "Curator")
                        .WithOne("Group")
                        .HasForeignKey("DEEPLOM.Models.CollegeGroup", "CuratorId");

                    b.HasOne("DEEPLOM.Models.Specialty", "Specialty")
                        .WithMany("Groups")
                        .HasForeignKey("SpecialtyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DEEPLOM.Models.Director", b =>
                {
                    b.HasOne("DEEPLOM.Models.College", "College")
                        .WithOne("Director")
                        .HasForeignKey("DEEPLOM.Models.Director", "CollegeId");

                    b.HasOne("DEEPLOM.Models.User", "User")
                        .WithMany("Directors")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DEEPLOM.Models.Lesson", b =>
                {
                    b.HasOne("DEEPLOM.Models.TeacherSubjectInfo", "TeacherSubjectInfo")
                        .WithMany("Lessons")
                        .HasForeignKey("TeacherSubjectInfoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DEEPLOM.Models.Topic", "Topic")
                        .WithMany("Lessons")
                        .HasForeignKey("TopicId");
                });

            modelBuilder.Entity("DEEPLOM.Models.Mark", b =>
                {
                    b.HasOne("DEEPLOM.Models.Lesson", "Lesson")
                        .WithMany("Marks")
                        .HasForeignKey("LessonId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DEEPLOM.Models.Student", "Student")
                        .WithMany("Marks")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DEEPLOM.Models.Message", b =>
                {
                    b.HasOne("DEEPLOM.Models.Reciever", "Reciever")
                        .WithMany()
                        .HasForeignKey("RecieverId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DEEPLOM.Models.User", "UserSender")
                        .WithMany()
                        .HasForeignKey("UserSenderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DEEPLOM.Models.Reciever", b =>
                {
                    b.HasOne("DEEPLOM.Models.User", "UserReciever")
                        .WithMany()
                        .HasForeignKey("UserRecieverId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DEEPLOM.Models.Semester", b =>
                {
                    b.HasOne("DEEPLOM.Models.SubGroup", "SubGroup")
                        .WithMany()
                        .HasForeignKey("SubGroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DEEPLOM.Models.Specialty", b =>
                {
                    b.HasOne("DEEPLOM.Models.College", "College")
                        .WithMany("Specialties")
                        .HasForeignKey("CollegeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DEEPLOM.Models.Student", b =>
                {
                    b.HasOne("DEEPLOM.Models.SubGroup", "SubGroup")
                        .WithMany("Students")
                        .HasForeignKey("SubGroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DEEPLOM.Models.User", "User")
                        .WithMany("Students")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DEEPLOM.Models.SubGroup", b =>
                {
                    b.HasOne("DEEPLOM.Models.CollegeGroup", "Group")
                        .WithMany("SubGroups")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DEEPLOM.Models.Subject", b =>
                {
                    b.HasOne("DEEPLOM.Models.College", "College")
                        .WithMany("Subjects")
                        .HasForeignKey("CollegeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DEEPLOM.Models.Teacher", b =>
                {
                    b.HasOne("DEEPLOM.Models.College", "College")
                        .WithMany()
                        .HasForeignKey("CollegeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DEEPLOM.Models.User", "User")
                        .WithMany("Teachers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DEEPLOM.Models.TeacherSubjectInfo", b =>
                {
                    b.HasOne("DEEPLOM.Models.Semester", "Semester")
                        .WithMany("TeacherSubjectInfos")
                        .HasForeignKey("SemesterId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DEEPLOM.Models.Subject", "Subject")
                        .WithMany("TeacherSubjectInfos")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DEEPLOM.Models.Teacher", "Teacher")
                        .WithMany("TeacherSubjectInfos")
                        .HasForeignKey("TeacherId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DEEPLOM.Models.Topic", b =>
                {
                    b.HasOne("DEEPLOM.Models.Subject", "Subject")
                        .WithMany("Topics")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DEEPLOM.Models.User", b =>
                {
                    b.HasOne("DEEPLOM.Models.College")
                        .WithMany("Users")
                        .HasForeignKey("CollegeID");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("DEEPLOM.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("DEEPLOM.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DEEPLOM.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("DEEPLOM.Models.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
