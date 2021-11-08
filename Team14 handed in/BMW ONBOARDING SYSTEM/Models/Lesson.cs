using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BMW_ONBOARDING_SYSTEM.Models
{
    public class Lesson
    {
        public Lesson()
        {
            LessonOutcomes = new List<LessonOutcome>();
        }

        [Key]
        public int LessonID { get; set; }

        public int LessonCompletionStatusID { get; set; }
        [StringLength(50)]
        public string LessonDescription { get; set; }
        [StringLength(50)]
        public string LessonName { get; set; }


        public virtual Course Course { get; set; }
        public int CourseID { get; set; }


        public virtual List<LessonOutcome> LessonOutcomes { get; set; }
    }
}
