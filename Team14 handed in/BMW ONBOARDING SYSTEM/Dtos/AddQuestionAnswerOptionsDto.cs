using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BMW_ONBOARDING_SYSTEM.Dtos
{
    public class AddQuestionAnswerOptionsDto
    {
        public int QuestionId { get; set; }

        public List<AnswerOptionDto> Options { get; set; }

        public AddQuestionAnswerOptionsDto()
        {
            Options = new List<AnswerOptionDto>();
        }
    }

    public class AnswerOptionDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Correct { get; set; }
    }
}