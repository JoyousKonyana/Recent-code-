namespace BMW_ONBOARDING_SYSTEM.Dtos
{
    public class GetCourseEnrollmentDto
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public int OnborderId { get; set; }
        public string OnborderFullName { get; set; }
        public string GraduationDate { get; set; }
        public string EnrollmentDate { get; set; }
    }
}