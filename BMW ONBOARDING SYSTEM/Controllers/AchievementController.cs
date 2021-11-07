using AutoMapper;
using BMW_ONBOARDING_SYSTEM.Dtos;
using BMW_ONBOARDING_SYSTEM.Interfaces;
using BMW_ONBOARDING_SYSTEM.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ONBOARDING_SYSTEM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AchievementController : ControllerBase
    {
        private readonly IAchievementRepository _achievementRepository;
        private readonly IMapper _mapper;

        private readonly INF370DBContext _context;

        // functionality not implemented yet
        // create a quiz together with a question
        public AchievementController(IAchievementRepository achievementRepository, IMapper mapper, INF370DBContext context)
        {
            _achievementRepository = achievementRepository;
            _mapper = mapper;
            _context = context;
        }
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllAchievement()
        {
            try
            {
                var achievements = await _achievementRepository.GetAllAchievementsAsync();
                return Ok(achievements);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetAchievementById(int id)
        {
            try
            {
                var achievement = await _achievementRepository.GetAchievementByIdAsync(id);
                return Ok(achievement);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetAchiementByOnboarderId(int id)
        {
            try
            {
                var achievement = await _achievementRepository.GetAchievementbyonoarderIDAsync(id);
                return Ok(achievement);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetAchiementByCourseId(int id)
        {
            try
            {
                var achievement = await _achievementRepository.GetAchievementcourseIDAsync(id);
                return Ok(achievement);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }





    }
}
