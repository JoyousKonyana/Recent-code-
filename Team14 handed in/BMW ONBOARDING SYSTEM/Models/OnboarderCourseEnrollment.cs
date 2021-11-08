using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ONBOARDING_SYSTEM.Models
{
    public class OnboarderCourseEnrollment
    {
        public int Id { get; set; }

        public DateTime EnrollmentDate { get; set; }
        public DateTime? GraduationDate { get; set; }

        public virtual Course Course { get; set; }
        public int CourseID { get; set; }

        public virtual Onboarder Onboarder { get; set; }
        public int OnboarderID { get; set; }
    }
}
