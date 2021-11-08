using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BMW_ONBOARDING_SYSTEM.Dtos
{
    public class AddQuestionBankDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int LessonOutcomeId { get; set; }

        public List<BankQuestionDto> Questions { get; set; }

        public AddQuestionBankDto()
        {
            Questions = new List<BankQuestionDto>();
        }

    }

    public class BankQuestionDto
    {
        [Required]
        public string Name { get; set; }
    }
}