using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NZWalks.API.Data;
using NZWalks.API.Models.DTO;

namespace NZWalks.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DifficultyController : ControllerBase
    {
        private readonly NZWalksDbContext dbContext;

        public DifficultyController(NZWalksDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [Authorize(Roles = "Writer")]
        public IActionResult GetAll()
        {
            var difficulties = dbContext.Difficulties.Select(d => new DifficultyDto
            {
                Id = d.Id,
                Name = d.Name
            }).ToList();

            return Ok(difficulties);
        }
    }
}
