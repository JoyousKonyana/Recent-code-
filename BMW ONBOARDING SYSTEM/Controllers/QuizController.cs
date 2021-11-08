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
                        .Where(question => question.AnswerOptions.Count >= 2)
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



        
        [HttpPost("SubmitQuiz/{onboarderid}")]
        public ActionResult<GetQuizDetailsDto> SubmitQuiz([FromBody] SubmitQuizDto model, int onboarderid)
        {

            var message = "";
            if (!ModelState.IsValid)
            {
                message = "Something went wrong on your side.";
                return BadRequest(new { message });
            }

      

            var quizInDb = _context.Quizzes
                .Include(item => item.QuestionBank)
                .ThenInclude(item => item.Questions)
                .Include(item => item.LessonOutcome)
                .ThenInclude(item => item.Lesson)
                .ThenInclude(item => item.Course)
                .Where(item => item.Id == model.QuizId)
                .FirstOrDefault();

            if (quizInDb == null)
            {
                message = "Quiz not found";
                return BadRequest(new { message });
            }

            var quizBankId = quizInDb.QuestionBankId;

            var questionBank = _context.QuestionBank
                .Include(item => item.Questions)
                .FirstOrDefault(item => item.Id == quizBankId);


            var count = 0;
            foreach ( var question in questionBank.Questions) 
            {

                foreach (var questionQuiz in model.QuestionsAndOptions) 
                {

                 

                    if (question.Id == questionQuiz.QuestionId)
                    {
                        var correctOptions = _context.QuestionAnswerOptions
                            .Where(item=>item.QuestionId == questionQuiz.QuestionId)
                            .ToList();

                        foreach(var optionFromDb in correctOptions)
                        {
                            if (questionQuiz.OptionId == optionFromDb.Id && optionFromDb.IsOptionAnswer)
                            {
                                count += 1;
                            }
                         
                        }
                      
                    }
                }
            }

            var OnberderPercentage = (count / model.QuestionsAndOptions.Count) * 100;

            if (OnberderPercentage < quizInDb.PassMarkPercentage)
            {
                message = "You did not meet the minimum mark required to pass.";
                return BadRequest(new { message });
            }
            if (OnberderPercentage >= quizInDb.PassMarkPercentage)
            {
                var onboarderAchivement = new Achievement()
                {
                    CourseId = quizInDb.LessonOutcome.Lesson.CourseID,
                    OnboarderId = onboarderid,
                    MarkAchieved = OnberderPercentage,
                    AchievementDate = DateTime.Now,
                    AchievementTypeId = 1,
                    QuizId = quizInDb.Id

                };
                _context.Achievement.Add(onboarderAchivement);
                _context.SaveChanges();
            }

            return Ok();

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
