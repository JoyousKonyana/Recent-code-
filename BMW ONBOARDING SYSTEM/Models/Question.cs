using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BMW_ONBOARDING_SYSTEM.Models
{
    public class Question
    {
        public Question()
        {
            AnswerOptions = new List<QuestionAnswerOption>();
        }

        [Key]
        public int Id { get; set; }

        public string Title { get; set; }


        public virtual QuestionBank QuestionBank { get; set; }
        public int QuestionBankId { get; set; }

        public virtual List<QuestionAnswerOption> AnswerOptions { get; set; }
    }
}
