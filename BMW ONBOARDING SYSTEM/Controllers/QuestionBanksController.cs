using System.Collections.Generic;
using System.Linq;
using BMW_ONBOARDING_SYSTEM.Dtos;
using Microsoft.AspNetCore.Mvc;
using BMW_ONBOARDING_SYSTEM.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace BMW_ONBOARDING_SYSTEM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionBanksController : ControllerBase
    {
        private readonly INF370DBContext _context;

        public QuestionBanksController(INF370DBContext context)
        {
            _context = context;
        }


        [HttpGet("Get/{questionBankId}")]
        public ActionResult<GetQuestionBankWithQuestionsDto> GetQuestionBank(int questionBankId)
        {
            var bankInDb = _context.QuestionBank
                .Where(item => item.Id == questionBankId)
                .Include(item => item.LessonOutcome)
                .ThenInclude(item => item.Lesson)
                .ThenInclude(item => item.Course)
                .Include(item => item.Questions)
                .ThenInclude(item => item.AnswerOptions)
                .Select(item => new GetQuestionBankWithQuestionsDto()
                {
                    Id = item.Id,
                    Name = item.Name,
                    CourseId = item.LessonOutcome.Lesson.Course.CourseID,
                    CourseName = item.LessonOutcome.Lesson.Course.CourseName,
                    LessonId = item.LessonOutcome.Lesson.LessonID,
                    LessonName = item.LessonOutcome.Lesson.LessonName,
                    LessonOutcomeId = item.LessonOutcome.LessonOutcomeID,
                    LessonOutcomeName = item.LessonOutcome.LessonOutcomeName,
                    Questions = item.Questions.Select(question => new GetBankQuestionDto
                    {
                        Id = question.Id,
                        Name = question.Title
                    }).ToList()

                }).FirstOrDefault();

            if (bankInDb == null)
            {
                return BadRequest(new { message = "Question Bank not found" });
            }

            return bankInDb;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetQuestionBank>> GetQuestionBanks()
        {
            var banksInDb = _context.QuestionBank
                .Include(item => item.LessonOutcome)
                .ThenInclude(item => item.Lesson)
                .ThenInclude(item => item.Course)
                .Include(item => item.Questions)
                .ThenInclude(item => item.AnswerOptions)
                .Select(item => new GetQuestionBank()
                {
                    Id = item.Id,
                    Name = item.Name,
                    CourseId = item.LessonOutcome.Lesson.Course.CourseID,
                    CourseName = item.LessonOutcome.Lesson.Course.CourseName,
                    LessonId = item.LessonOutcome.Lesson.LessonID,
                    LessonName = item.LessonOutcome.Lesson.LessonName,
                    LessonOutcomeId = item.LessonOutcome.LessonOutcomeID,
                    LessonOutcomeName = item.LessonOutcome.LessonOutcomeName
                }).ToList();

            return banksInDb;
        }

        [HttpGet("GetAll/LessonOutcome/{lessonOutcomeId}")]
        public ActionResult<IEnumerable<GetQuestionBank>> GetQuestionBanksByLessonOutcomeId(int lessonOutcomeId)
        {
            var isLessonOutcomeInDb = _context.LessonOutcome.FirstOrDefault(item => item.LessonOutcomeID == lessonOutcomeId);

            if (isLessonOutcomeInDb == null)
            {
                return BadRequest(new { message = "Lesson Outcome not found" });
            }

            var banksInDb = _context.QuestionBank
                .Where(item => item.LessonOutcomeID == isLessonOutcomeInDb.LessonOutcomeID)
                .Include(item => item.LessonOutcome)
                .ThenInclude(item => item.Lesson)
                .ThenInclude(item => item.Course)
                .Include(item => item.Questions)
                .ThenInclude(item => item.AnswerOptions)
                .Select(item => new GetQuestionBank()
                {
                    Id = item.Id,
                    Name = item.Name,
                    CourseId = item.LessonOutcome.Lesson.Course.CourseID,
                    CourseName = item.LessonOutcome.Lesson.Course.CourseName,
                    LessonId = item.LessonOutcome.Lesson.LessonID,
                    LessonName = item.LessonOutcome.Lesson.LessonName,
                    LessonOutcomeId = item.LessonOutcome.LessonOutcomeID,
                    LessonOutcomeName = item.LessonOutcome.LessonOutcomeName
                }).ToList();

            return banksInDb;
        }


        [HttpGet("GetAll/WithQuestions/LessonOutcome/{lessonOutcomeId}")]
        public ActionResult<IEnumerable<GetQuestionBankWithQuestionsDto>> GetQuestionBanksWithQuestionsByLessonOutcomeId(int lessonOutcomeId)
        {
            var banksInDb = _context.QuestionBank
                .Where(item => item.LessonOutcomeID == lessonOutcomeId)
                .Where(item => item.Questions.Any())
                .Include(item => item.LessonOutcome)
                .ThenInclude(item => item.Lesson)
                .ThenInclude(item => item.Course)
                .Include(item => item.Questions)
                .ThenInclude(item => item.AnswerOptions)
                .Select(item => new GetQuestionBankWithQuestionsDto()
                {
                    Id = item.Id,
                    Name = item.Name,
                    CourseId = item.LessonOutcome.Lesson.Course.CourseID,
                    CourseName = item.LessonOutcome.Lesson.Course.CourseName,
                    LessonId = item.LessonOutcome.Lesson.LessonID,
                    LessonName = item.LessonOutcome.Lesson.LessonName,
                    LessonOutcomeId = item.LessonOutcome.LessonOutcomeID,
                    LessonOutcomeName = item.LessonOutcome.LessonOutcomeName,
                    Questions = item.Questions.Select(question => new GetBankQuestionDto
                    {
                        Id = question.Id,
                        Name = question.Title
                    }).ToList()

                }).ToList();

            return banksInDb;
        }

        [HttpPost("Add")]
        public IActionResult AddQuestionBank(AddQuestionBankDto model)
        {
            var message = "";
            if (!ModelState.IsValid)
            {
                message = "Something went wrong on your side.";
                return BadRequest(new { message });
            }

            var isLessonOutcomeInDb = _context.LessonOutcome
                .FirstOrDefault(item => item.LessonOutcomeID == model.LessonOutcomeId);

            if (isLessonOutcomeInDb == null)
            {
                message = "Lesson outcome not found.";
                return BadRequest(new { message });
            }

            var newBank = new QuestionBank()
            {
                Name = model.Name,
                LessonOutcomeID = isLessonOutcomeInDb.LessonOutcomeID
            };
            _context.QuestionBank.Add(newBank);
            _context.SaveChanges();

            foreach (var question in model.Questions)
            {
                var newQuestion = new Question()
                {
                    QuestionBankId = newBank.Id,
                    Title = question.Name
                };
                _context.Questions.Add(newQuestion);
                _context.SaveChanges();
            }

            return Ok();
        }

        [HttpPost("Question/AnswerOptions/Add")]
        public IActionResult AddQuestionAnswerOptions(AddQuestionAnswerOptionsDto model)
        {
            var message = "";
            if (!ModelState.IsValid)
            {
                message = "Something went wrong on your side.";
                return BadRequest(new { message });
            }

            var isQuestionInDb = _context.Questions
                .FirstOrDefault(item => item.Id == model.QuestionId);

            if (isQuestionInDb == null)
            {
                message = "Question not found.";
                return BadRequest(new { message });
            }

            foreach (var option in model.Options)
            {
                var answerOption = new QuestionAnswerOption()
                {
                    IsOptionAnswer = option.Correct.ToLower().Equals("yes".ToLower()),
                    Option = option.Name,
                    QuestionId = isQuestionInDb.Id
                };
                _context.QuestionAnswerOptions.Add(answerOption);
                _context.SaveChanges();
            }

            return Ok();
        }

        [HttpGet("Question/AnswerOptions/GetAll/{questionId}")]
        public ActionResult<IEnumerable<GetAnswerOptionDto>> GetQuestionAnswerOptions(int questionId)
        {
            var message = "";
            var isQuestionInDb = _context.Questions
                .FirstOrDefault(item => item.Id == questionId);

            if (isQuestionInDb == null)
            {
                message = "Question not found.";
                return BadRequest(new { message });
            }

            var answerOptionsInDb = _context.QuestionAnswerOptions
                .Where(item => item.QuestionId == questionId)
                .Select(item => new GetAnswerOptionDto
                {
                    Id = item.Id,
                    Option = item.Option,
                    Correct = item.IsOptionAnswer == true ? "Yes" : "No"
                }).ToList();

            return answerOptionsInDb;
        }

    }
}
