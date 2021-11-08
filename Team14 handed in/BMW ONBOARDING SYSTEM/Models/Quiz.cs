using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BMW_ONBOARDING_SYSTEM.Models
{
    public class Quiz
    {

        public int Id { get; set; }


        [StringLength(255)]
        public string Name { get; set; }

        public int PassMarkPercentage { get; set; }

        public DateTime DueDate { get; set; }

        public int NumberOfQuestions { get; set; }


        public virtual LessonOutcome LessonOutcome { get; set; }
        public int LessonOutcomeID { get; set; }

        public virtual QuestionBank QuestionBank { get; set; }
        public int QuestionBankId { get; set; }

    }
}
