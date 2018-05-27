using System;
using System.Security.Claims;
using System.Threading.Tasks;
using DEEPLOM.Models;
using Microsoft.AspNetCore.Identity;

namespace DEEPLOM.Utils
{
	public static class UserUtils
	{
		public static async Task<User> CreateUser(UserManager<User> _userManager, string email, string password, string role)
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

		public static async Task<User> GetUserAsync(UserManager<User> userManager, ClaimsPrincipal user)
		{
			var resuser = await userManager.FindByNameAsync(user.FindFirst(ClaimsIdentity.DefaultNameClaimType).Value);
			return resuser;
		}
	}
}