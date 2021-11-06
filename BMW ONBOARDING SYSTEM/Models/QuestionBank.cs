using System;
using System.Collections.Generic;

namespace BMW_ONBOARDING_SYSTEM.Models
{
    public class QuestionBank
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual LessonOutcome LessonOutcome { get; set; }
        public int LessonOutcomeID { get; set; }

        public virtual List<Question> Questions { get; set; }
        public virtual List<Quiz> Quizzes { get; set; }

        public QuestionBank()
        {
            Questions = new List<Question>();
            Quizzes = new List<Quiz>();
        }
    }
}
