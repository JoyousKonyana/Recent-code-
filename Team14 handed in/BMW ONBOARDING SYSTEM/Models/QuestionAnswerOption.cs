namespace BMW_ONBOARDING_SYSTEM.Models
{
    public class QuestionAnswerOption
    {
        public int Id { get; set; }
        public string Option { get; set; }
        public bool IsOptionAnswer { get; set; }

        public virtual Question Question { get; set; }
        public int QuestionId { get; set; }

    }
}