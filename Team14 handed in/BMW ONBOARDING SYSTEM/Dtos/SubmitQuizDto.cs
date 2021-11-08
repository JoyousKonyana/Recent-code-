using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ONBOARDING_SYSTEM.Dtos
{
    public class SubmitQuizDto
    {
        public int QuizId { get; set; }

        public List<QuestionAndAnswersDto> QuestionsAndOptions { get; set; }
    }

    public class QuestionAndAnswersDto
    {
        public int OptionId { get; set; }
        public int QuestionId { get; set; }
    }
}
