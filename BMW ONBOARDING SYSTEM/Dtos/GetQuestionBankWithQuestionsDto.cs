using System.Collections.Generic;

namespace BMW_ONBOARDING_SYSTEM.Dtos
{
    public class GetQuestionBankWithQuestionsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int CourseId { get; set; }
        public string CourseName { get; set; }

        public int LessonId { get; set; }
        public string LessonName { get; set; }
        public int LessonOutcomeId { get; set; }
        public string LessonOutcomeName { get; set; }

        public List<GetBankQuestionDto> Questions { get; set; }

        public GetQuestionBankWithQuestionsDto()
        {
            Questions = new List<GetBankQuestionDto>();
        }
    }

    public class GetBankQuestionDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

    }
}