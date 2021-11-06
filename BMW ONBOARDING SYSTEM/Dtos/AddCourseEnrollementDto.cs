using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ONBOARDING_SYSTEM.Dtos
{
    public class AddCourseEnrollementDto
    {
        [Required]
        public int CourseId { get; set; }
        [Required]
        public int OnborderId { get; set; }
        [Required]
        public DateTime EnrollmentDate { get; set; }
    }
}