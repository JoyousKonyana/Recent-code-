//using BMW_ONBOARDING_SYSTEM.Interfaces;
//using BMW_ONBOARDING_SYSTEM.Models;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace BMW_ONBOARDING_SYSTEM.Repositories
//{
//    public class QuestionBankRepository : IQuestionBankRepository
//    {
//        private readonly INF370DBContext _inf370ContextDB;

//        public QuestionBankRepository(INF370DBContext inf370ContextDB)
//        {
//            _inf370ContextDB = inf370ContextDB;
//        }
//        public void Add<T>(T entity) where T : class
//        {
//            _inf370ContextDB.Add(entity);
//        }

//        public void Delete<T>(T entity) where T : class
//        {
//            _inf370ContextDB.Remove(entity);
//        }

//        public async Task<QuestionBank[]> GetAllQuestionBanksAsync()
//        {
//            IQueryable<QuestionBank> questionBanks = _inf370ContextDB.QuestionBank.Include(x => x.Course).Include(x => x.Lesson).Include(x => x.LessonOutcome);

//            return await questionBanks.ToArrayAsync();
//        }

//        public Task<QuestionBank[]> GetCourseByIdAsync(int courseId)
//        {
//            throw new NotImplementedException();
//        }

//        public Task<OnboarderCourseEnrollment[]> GetCourseonoarderIDAsync(int onboarderID)
//        {
//            throw new NotImplementedException();
//        }

//        public async Task<QuestionBank> GetQuestionBankByID(int questionid)
//        {
//            IQueryable<QuestionBank> questionBanks = _inf370ContextDB.QuestionBank.Where(x => x.QuestionBankId == questionid);

//            return await questionBanks.FirstOrDefaultAsync();
//        }

//        public async Task<QuestionBank> GetQuestionBankbyIDsNameAsync(int lessonid, int courseid, int lessonoutcomeid)
//        {
//            IQueryable<QuestionBank> questionBanks = _inf370ContextDB.QuestionBank.
//                Where(x => x.CourseId == courseid && x.LessonId == lessonid && x.LessonOutcomeId == lessonoutcomeid).
//                Include(x => x.Question).ThenInclude(x => x.Option);

//            return await questionBanks.FirstOrDefaultAsync();
//        }

//        public async Task<QuestionBank[]> GetQuestionBankByQuizIdAsync(int quizid)
//        {
//            IQueryable<QuestionBank> questionBanks = _inf370ContextDB.QuestionBank.Include(x => x.Question)
//                .ThenInclude(x => x.Option);

//            return await questionBanks.ToArrayAsync();
//        }

//        public async Task<bool> SaveChangesAsync()
//        {
//            return await _inf370ContextDB.SaveChangesAsync() > 0;
//        }
//    }
//}
