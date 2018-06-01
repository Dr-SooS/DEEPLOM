using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DEEPLOM.Models;
using DEEPLOM.Utils;

namespace DEEPLOM.Controllers
{
    [Produces("application/json")]
    [Route("api/Topics")]
    public class TopicsController : Controller
    {
        private readonly CollegeDbContext _context;

		public TopicsController(CollegeDbContext context)
		{
			_context = context;
		}

		// GET: api/Topics
		[HttpGet]
		public IEnumerable<TopicDTO> GetTopics()
		{
			var topics = new List<TopicDTO>();
			foreach (var topic in _context.Topics.ToList())
				topics.Add(DtoBuilder.BuildDto(topic));
			return topics;
		}

	    [HttpGet("subject/{id}")]
	    public async Task<IActionResult> GetSubjectTopic([FromRoute] int id)
	    {
		    return Ok(_context.Topics.Where(t => t.SubjectId == id).Select(t => new TopicDTO() {ID = t.ID, Name = t.Name}));
	    }
	    
	    
		// GET: api/Topics/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetTopic([FromRoute] int id)
		{
			var topic = await _context.Topics.SingleOrDefaultAsync(m => m.ID == id);

			if (topic == null)
			{
				return NotFound();
			}

			return Ok(DtoBuilder.BuildDto(topic));
		}

		// PUT: api/Topics/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTopic([FromRoute] int id, [FromBody] TopicDTO topicDto)
		{
			if (id != topicDto.ID)
			{
				return BadRequest();
			}

			var topic = await _context.Topics.FirstOrDefaultAsync(s => s.ID == topicDto.ID);
			topic.Name = topicDto.Name;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!TopicExists(id))
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

		// POST: api/Topics
		[HttpPost]
		public async Task<IActionResult> PostTopic([FromBody] TopicDTO topicDto)
		{
			var topic = new Topic() {Name = topicDto.Name};
			_context.Topics.Add(topic);
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateException)
			{
				if (TopicExists(topicDto.ID))
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

		// DELETE: api/Topics/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTopic([FromRoute] int id)
		{
			var topic = await _context.Topics.SingleOrDefaultAsync(m => m.ID == id);
			if (topic == null)
			{
				return NotFound();
			}

			_context.Topics.Remove(topic);
			await _context.SaveChangesAsync();

			return Ok();
		}

		private bool TopicExists(int id)
		{
			return _context.Topics.Any(e => e.ID == id);
		}
    }
}