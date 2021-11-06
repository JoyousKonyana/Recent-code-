using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ONBOARDING_SYSTEM.Dtos
{
    public class GetQuestionBank
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int CourseId { get; set; }
        public string CourseName { get; set; }

        public int LessonId { get; set; }
        public string LessonName { get; set; }
        public int LessonOutcomeId { get; set; }
        public string LessonOutcomeName { get; set; }
    }
}
