using System;
using System.Linq;
using System.Threading.Tasks;
using DEEPLOM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DEEPLOM.Controllers
{
	[Produces("application/json")]
	[Route("api/Messages")]
	public class MessagesController : Controller
	{
		private readonly CollegeDbContext _context;

		public MessagesController(CollegeDbContext context)
		{
			_context = context;
		}

		[HttpGet("sent/user/{id}")]
		public async Task<IActionResult> GetUserSentMessages([FromRoute] string id)
		{
			return Ok(_context.Messages
			                  .Include(m => m.UserSender)
			                  .Include(m => m.Reciever)
			                  .ThenInclude(m => m.UserReciever)
			                  .Where(m => m.UserSenderId == id)
			                  .Select(m => new MessageDTO()
			                  {
				                  ID    = m.ID,
				                  Text  = m.Text,
				                  Topic = m.Topic,
				                  UserReciever = new UserDTO()
				                  {
					                  Id        = m.Reciever.UserRecieverId,
					                  FirstName = m.Reciever.UserReciever.FirstName,
					                  LastName  = m.Reciever.UserReciever.LastName
				                  },
				                  UserSender = new UserDTO()
				                  {
					                  Id        = m.UserSenderId,
					                  FirstName = m.UserSender.FirstName,
					                  LastName  = m.UserSender.LastName
				                  }
			                  }).ToList());
		}

		[HttpGet("received/user/{id}")]
		public async Task<IActionResult> GetUserRecievedMessages([FromRoute] string id)
		{
			return Ok(_context.Messages
			                  .Include(m => m.UserSender)
			                  .Include(m => m.Reciever)
			                  .ThenInclude(m => m.UserReciever)
			                  .Where(m => m.Reciever.UserRecieverId == id)
			                  .Select(m => new MessageDTO()
			                  {
				                  ID    = m.ID,
				                  Text  = m.Text,
				                  Topic = m.Topic,
				                  UserReciever = new UserDTO()
				                  {
					                  Id        = m.Reciever.UserRecieverId,
					                  FirstName = m.Reciever.UserReciever.FirstName,
					                  LastName  = m.Reciever.UserReciever.LastName
				                  },
				                  UserSender = new UserDTO()
				                  {
					                  Id        = m.UserSenderId,
					                  FirstName = m.UserSender.FirstName,
					                  LastName  = m.UserSender.LastName
				                  }
			                  }).ToList());
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetMessage([FromRoute] int id)
		{
			return Ok(await _context.Messages
			                        .Include(m => m.UserSender)
			                        .Include(m => m.Reciever)
			                        .ThenInclude(m => m.UserReciever)
			                        .Where(m => m.ID == id)
			                        .Select(m => new MessageDTO()
			                        {
				                        ID    = m.ID,
				                        Text  = m.Text,
				                        Topic = m.Topic,
				                        UserReciever = new UserDTO()
				                        {
					                        Id        = m.Reciever.UserRecieverId,
					                        FirstName = m.Reciever.UserReciever.FirstName,
					                        LastName  = m.Reciever.UserReciever.LastName
				                        },
				                        UserSender = new UserDTO()
				                        {
					                        Id        = m.UserSenderId,
					                        FirstName = m.UserSender.FirstName,
					                        LastName  = m.UserSender.LastName
				                        }
			                        }).FirstOrDefaultAsync(m => m.ID == id));
		}

		[HttpPost]
		public async Task<IActionResult> PostMessage([FromBody] MessageDTO messageDto)
		{
			var      userReciever = await _context.Users.FirstOrDefaultAsync(u => u.Id == messageDto.UserReciever.Id);
			Reciever reciever     = await _context.Recievers.FirstOrDefaultAsync(r => r.UserRecieverId == userReciever.Id);

			if (reciever == null)
			{
				reciever = _context.Recievers.Add(new Reciever() {UserRecieverId = userReciever.Id}).Entity;
				await _context.SaveChangesAsync();
			}

			_context.Messages.Add(new Message()
			{
				Text         = messageDto.Text,
				Topic        = messageDto.Topic,
				Reciever     = reciever,
				UserSenderId = messageDto.UserSender.Id
			});

			try
			{
				await _context.SaveChangesAsync();
				return Ok();
			}
			catch (Exception e)
			{
				return StatusCode(500, "Sending Error");
			}
		}
	}
}