using AutoMapper;
using BMW_ONBOARDING_SYSTEM.Helpers;
using BMW_ONBOARDING_SYSTEM.Interfaces;
using BMW_ONBOARDING_SYSTEM.Models;
using BMW_ONBOARDING_SYSTEM.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using BMW_ONBOARDING_SYSTEM.Dtos;
using Microsoft.EntityFrameworkCore;

namespace BMW_ONBOARDING_SYSTEM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnboarderController : ControllerBase
    {
        private readonly IOnboarderRepository _onboarderRepository;
        private readonly IMapper _mapper;
        private readonly INF370DBContext _context;

        public OnboarderController(IOnboarderRepository onboarderRepository, IMapper mapper, INF370DBContext context)
        {
            _onboarderRepository = onboarderRepository;
            _mapper = mapper;
            _context = context;
        }

        //[Authorize(Role.Admin)]
        [HttpGet("GetAllOnboarders")]
        public async Task<ActionResult<IEnumerable<GetOnborderDto>>> GetAllOnboarders()
        {
            var OnbordersInDb = await _context.Onboarder
                .Include(item => item.Employee)
                .Select(item => new GetOnborderDto
                {
                    Id = item.OnboarderID,
                    EmailAddress = item.Employee.EmailAddress,
                    FullName = item.Employee.FirstName + " " + item.Employee.LastName
                }).ToListAsync();

            return OnbordersInDb;
        }

        [HttpPost("Enroll")]
        public IActionResult AddEnrollment([FromBody] AddCourseEnrollementDto model)
        {
            var message = "";
            if (!ModelState.IsValid)
            {
                message = "Something went wrong on your side";
                return BadRequest(new { message });
            }

            var iEnrollmentInDb = _context.OnboarderCourseEnrollment
                .Where(item => item.OnboarderID == model.OnborderId)
                .Any(item => item.CourseID == model.CourseId);

            if (iEnrollmentInDb)
            {
                message = "Onborder is already enrolled to course.";
                return BadRequest(new { message });
            }

            var newEnrollment = new OnboarderCourseEnrollment()
            {
                OnboarderID = model.OnborderId,
                CourseID = model.CourseId,
                EnrollmentDate = model.EnrollmentDate
            };
            _context.OnboarderCourseEnrollment.Add(newEnrollment);
            _context.SaveChanges();

            return Ok();

        }

        [HttpGet("Course/Enrollments/GetAll/{courseId}")]
        public ActionResult<IEnumerable<GetCourseEnrollmentDto>> GetCourseEnrollments(int courseId)
        {
            var isCourseInDb = _context.Course.FirstOrDefault(item => item.CourseID == courseId);

            if (isCourseInDb == null)
            {
                var message = "Course not found";
                return BadRequest(new { message });
            }

            var courseEnrollmentsInDb = _context.OnboarderCourseEnrollment
                .Where(item => item.CourseID == courseId)
                .Include(item => item.Course)
                .Include(item => item.Onboarder)
                .ThenInclude(item => item.Employee)
                .OrderBy(item => item.EnrollmentDate)
                .Select(item => new GetCourseEnrollmentDto
                {
                    Id = item.Id,
                    CourseId = item.Course.CourseID,
                    CourseName = item.Course.CourseName,
                    OnborderId = item.Onboarder.OnboarderID,
                    OnborderFullName = item.Onboarder.Employee.FirstName + " " + item.Onboarder.Employee.LastName,
                    EnrollmentDate = item.EnrollmentDate.ToString("dd/MM/yyyy"),
                    GraduationDate = item.GraduationDate == null ? "Not Graduated" : "Graduated"
                }).ToList();

            return courseEnrollmentsInDb;
        }

        [Authorize(Role.Admin)]
        [HttpGet("{id}")]
        [Route("[action]/{id}")]
        //getAll courses Assigeng to this a onboarder
        // used to show courses to onboarder
        public async Task<ActionResult<OnboarderCourseEnrollment[]>> GetAllCoursesAssignedToOnboarder(int empID)
        {
            try
            {

                empID = 2;
                var result = await _onboarderRepository.GetOnboarderbyEmpID(empID);

                if (result == null) return NotFound();
                OnboarderCourseEnrollment[] assignedCourses = await _onboarderRepository.GetAssignedCourses(2);
                if (assignedCourses == null) return NotFound();


                return assignedCourses;
            }
            catch (Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure");
            }
        }

        public void sendEmail(User user, string password)
        {
            SmtpClient Client = new SmtpClient()
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential()
                {
                    UserName = "skhosanajames48@gmail.com",
                    Password = "Nja@9901"
                }

            };
            MailAddress FromMail = new MailAddress("skhosanajames48@gmail.com", "Admin");
            MailAddress ToEmail = new MailAddress("konyanajoyous2@gmail.com", "Joyous");
            MailMessage Message = new MailMessage()
            {
                From = FromMail,
                Subject = "Log in details",
                Body = $"Good day \n Theis email aim to give you your login credentials \n Username: {user.Username} \n password: {password}"
            };

            Message.To.Add(ToEmail);

            try
            {
                //    Client.UseDefaultCredentials = true;

                Client.Send(Message);

            }
            catch (Exception ex)
            {

                var n = ex.Message;
            }
        }

        //[Authorize(Role.Onboarder)]
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<OnboarderCourseEnrollment>> GenerateCourseProgressReport([FromBody] OnboarderProgressViewModel model)
        {
            try
            {
                var result = await _onboarderRepository.GenerateOnboarderCourseProgress(model);

                if (result == null) return NotFound();

                return _mapper.Map<OnboarderCourseEnrollment>(result);
            }
            catch (Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure");
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<OnboarderCourseEnrollment[]>> GenerateAllCourseProgressReport([FromBody] OnboarderProgressViewModel model)
        {
            try
            {
                var result = await _onboarderRepository.GenerateAllOnboarderCourseProgress(model);

                if (result == null) return NotFound();

                return _mapper.Map<OnboarderCourseEnrollment[]>(result);
            }
            catch (Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure");
            }
        }

    }
}
