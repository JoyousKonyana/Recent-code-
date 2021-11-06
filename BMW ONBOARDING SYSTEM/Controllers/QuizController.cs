using System;
using System.Collections.Generic;
using System.Linq;
using BMW_ONBOARDING_SYSTEM.Dtos;
using BMW_ONBOARDING_SYSTEM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BMW_ONBOARDING_SYSTEM.Controllers
{
    [Route("api/[controller]")]
    public class QuizController : Controller
    {
        private readonly INF370DBContext _context;
        private static readonly Random rng = new Random();


        public QuizController(
            INF370DBContext context
            )
        {

            _context = context;
        }

        [HttpPost("Add")]
        public IActionResult AddLessonOutcomeQuiz([FromBody] AddLessonOutcomeQuizDto model)
        {
            var message = "";
            if (!ModelState.IsValid)
            {
                message = "Something went wrong on your side.";
                return BadRequest(new { message });
            }

            var isBankInDb = _context.QuestionBank
                .FirstOrDefault(item => item.Id == model.QuestionBankId);

            if (isBankInDb == null)
            {
                message = "Question bank not found";
                return BadRequest(new { message });
            }

            var isOutcomeInDb = _context.LessonOutcome
                .FirstOrDefault(item => item.LessonOutcomeID == Convert.ToInt32(model.OutcomeId));

            if (isOutcomeInDb == null)
            {
                message = "Lesson Outcome not found";
                return BadRequest(new { message });
            }

            var newQuiz = new Quiz()
            {
                Name = model.Name,
                LessonOutcomeID = isOutcomeInDb.LessonOutcomeID,
                QuestionBankId = isBankInDb.Id,
                NumberOfQuestions = model.NumberOfQuestions,
                PassMarkPercentage = model.PassMarkPercentage,
                DueDate = model.DueDate
            };

            _context.Quizzes.Add(newQuiz);
            _context.SaveChanges();

            return Ok();

        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GetLessonOutcomeQuizDto>> GetAllLessonOutcomeQuizzes()
        {
            var quizzesInDb = _context.Quizzes
                .Include(item => item.LessonOutcome)
                .Include(item => item.QuestionBank)
                .Select(item => new GetLessonOutcomeQuizDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    DueDate = item.DueDate.ToString("dd/MM/yyyy"),
                    PassMarkPercentage = item.PassMarkPercentage,
                    NumberOfQuestions = item.NumberOfQuestions,
                    QuestionBankId = item.QuestionBank.Id,
                    QuestionBankName = item.QuestionBank.Name,
                    LessonOutcomeId = item.LessonOutcome.LessonOutcomeID,
                    LessonOutcomeName = item.LessonOutcome.LessonOutcomeName
                }).ToList();

            return quizzesInDb;
        }

        [HttpGet("GetAll/LessonOutcome/{lessonOutcomeId}")]
        public ActionResult<IEnumerable<GetLessonOutcomeQuizDto>> GetAllLessonOutcomeQuizzes(int lessonOutcomeId)
        {
            var isOutcomeInDb = _context.LessonOutcome
                .FirstOrDefault(item => item.LessonOutcomeID == lessonOutcomeId);

            if (isOutcomeInDb == null)
            {
                var message = "Lesson Outcome not found";
                return BadRequest(new { message });
            }

            var quizzesInDb = _context.Quizzes
                .Where(item => item.LessonOutcomeID == lessonOutcomeId)
                .Include(item => item.LessonOutcome)
                .Include(item => item.QuestionBank)
                .Select(item => new GetLessonOutcomeQuizDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    DueDate = item.DueDate.ToString("dd/MM/yyyy"),
                    PassMarkPercentage = item.PassMarkPercentage,
                    NumberOfQuestions = item.NumberOfQuestions,
                    QuestionBankId = item.QuestionBank.Id,
                    QuestionBankName = item.QuestionBank.Name,
                    LessonOutcomeId = item.LessonOutcome.LessonOutcomeID,
                    LessonOutcomeName = item.LessonOutcome.LessonOutcomeName
                }).ToList();

            return quizzesInDb;
        }

      

        [HttpGet("Get/{quizId}")]
        public ActionResult<GetQuizDetailsDto> GetQuizDetails(int quizId)
        {
            var quiz = _context.Quizzes
                .Where(item => item.Id == quizId)
                .Include(item => item.QuestionBank)
                .Select(item => new GetQuizDetailsDto()
                {
                    Id = item.Id,
                    Name = item.Name,
                    DueDate = item.DueDate.ToString("dd/MM/yyyy"),
                    PassMarkPercentage = item.PassMarkPercentage,
                    NumberOfQuestions = item.NumberOfQuestions,
                    Questions = item.QuestionBank
                        .Questions
                        .Where(question => question.AnswerOptions.Count > 2)
                        .Select(question => new GetQuizQuestionDto
                        {
                            Id = question.Id,
                            Name = question.Title,
                            AnswerOptions = question.AnswerOptions
                                .Select(answer => new GetQuizQuestionAnswerOptionDto
                                {
                                    Id = answer.Id,
                                    Correct = answer.IsOptionAnswer,
                                    Option = answer.Option
                                }).ToList()
                        }).ToList()
                }).First();

            return quiz;
        }

        [HttpPost("Post/{courseid}/{onboarderid}/{quizId}")]

        [Route("[action]/{courseid}/{onboarderid}/{quizId}")]
        [HttpPost]
        public ActionResult<GetQuizDetailsDto> SubmitQuiz(int courseid,int onboarderid,int quizId,[FromBody] SubmitQuizDto[] submitQuizDtos)
        {

            var message = "";
            if (!ModelState.IsValid)
            {
                message = "Something went wrong on your side.";
                return BadRequest(new { message });
            }
            var count = 0;
            foreach(var quizAnswer in submitQuizDtos)
            {
                var option = _context.QuestionAnswerOptions.Where(x => x.Id == quizAnswer.QuestionId).FirstOrDefault();
                if (option.IsOptionAnswer)
                {
                    count += 1;
                }

            }

            var percentage = ((submitQuizDtos.Length)) / 2;
            var percentToReturn = ((count) / (submitQuizDtos.Length)) * 100;
            //assigned badge 1 which will be bronze you have just passed
            if (count > percentage && count< submitQuizDtos.Length)
            {
                var onboarderAchivement = new Achievement()
                {
                    CourseId = courseid,
                    OnboarderId = onboarderid,
                    MarkAchieved = count,
                    AchievementDate = DateTime.Now,
                    AchievementTypeId = 1,
                    QuizId = quizId

                };
  

                _context.Achievement.Add(onboarderAchivement);
                _context.SaveChanges();

                return Ok(percentToReturn);
            }
            else if(count == submitQuizDtos.Length)
            {
                var onboarderAchivement = new Achievement()
                {
                    CourseId = courseid,
                    OnboarderId = onboarderid,
                    MarkAchieved = count,
                    AchievementDate = DateTime.Now,
                    AchievementTypeId = 1,
                    QuizId = quizId

                };


                _context.Achievement.Add(onboarderAchivement);
                _context.SaveChanges();

                return Ok(percentToReturn);
            }

            return BadRequest("Sorry we could not capture achievement");
         
        }


        //public static void Shuffle<T>(IList<T> list)
        //{
        //    int n = list.Count;
        //    while (n > 1)
        //    {
        //        n--;
        //        int k = rng.Next(n + 1);
        //        T value = list[k];
        //        list[k] = list[n];
        //        list[n] = value;
        //    }
        //}
    }
}
