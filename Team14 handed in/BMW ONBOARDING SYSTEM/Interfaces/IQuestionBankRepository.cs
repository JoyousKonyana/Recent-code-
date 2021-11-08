//using BMW_ONBOARDING_SYSTEM.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace BMW_ONBOARDING_SYSTEM.Interfaces
//{
//    public interface IQuestionBankRepository
//    {
//        void Add<T>(T entity) where T : class;

//        void Delete<T>(T entity) where T : class;

//        Task<bool> SaveChangesAsync();

//        Task<QuestionBank[]> GetAllQuestionBanksAsync();
//        Task<QuestionBank> GetQuestionBankbyIDsNameAsync(int lessonid, int courseid, int lessonoutcomeid);

//        Task<QuestionBank[]> GetQuestionBankByQuizIdAsync(int quizid);

//        Task<QuestionBank> GetQuestionBankByID(int questionid);

//        Task<OnboarderCourseEnrollment[]> GetCourseonoarderIDAsync(int onboarderID);

//    }
//}
