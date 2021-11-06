using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BMW_ONBOARDING_SYSTEM.Models
{
    public class Course
    {
        public Course()
        {
            Lessons = new List<Lesson>();
            OnBoarders = new List<OnboarderCourseEnrollment>();
        }

        [Key]
        public int CourseID { get; set; }

        [StringLength(255)]
        public string CourseName { get; set; }

        [StringLength(255)]
        public string CourseDescription { get; set; }

        public DateTime? CourseDueDate { get; set; }

        public virtual List<Lesson> Lessons { get; set; }

        public virtual List<OnboarderCourseEnrollment> OnBoarders { get; set; }
    }
}
