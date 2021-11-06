using System;
using System.ComponentModel.DataAnnotations;
using BMW_ONBOARDING_SYSTEM.Models;

namespace BMW_ONBOARDING_SYSTEM.Dtos
{
    public class AddLessonOutcomeQuizDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int PassMarkPercentage { get; set; }
        [Required]
        public DateTime DueDate { get; set; }
        [Required]
        public int NumberOfQuestions { get; set; }

        [Required]
        public string OutcomeId { get; set; }
        [Required]
        public int QuestionBankId { get; set; }
    }
}