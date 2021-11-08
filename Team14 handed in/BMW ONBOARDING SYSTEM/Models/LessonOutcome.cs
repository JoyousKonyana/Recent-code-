using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BMW_ONBOARDING_SYSTEM.Models
{
    public class LessonOutcome
    {
      

        [Key]
        public int LessonOutcomeID { get; set; }

        [StringLength(255)]
        public string LessonOutcomeDescription { get; set; }

        [StringLength(255)]
        public string LessonOutcomeName { get; set; }


        public int LessonID { get; set; }
        public virtual Lesson Lesson { get; set; }

        public virtual List<Quiz> Quizzes { get; set; }

        public LessonOutcome()
        {
            Quizzes = new List<Quiz>();
        }
    }
}
