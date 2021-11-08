using BMW_ONBOARDING_SYSTEM.Interfaces;
using BMW_ONBOARDING_SYSTEM.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ONBOARDING_SYSTEM.Repositories
{
    public class AchievementRepository: IAchievementRepository
    {
        private readonly INF370DBContext _inf370ContextDB;

        public AchievementRepository(INF370DBContext inf370ContextDB)
        {
            _inf370ContextDB = inf370ContextDB;
        }
        public void Add<T>(T entity) where T : class
        {
            _inf370ContextDB.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _inf370ContextDB.Remove(entity);
        }

        public Task<Achievement> GetAchievementByIdAsync(int id)
        {
            IQueryable<Achievement> existingAchievement = _inf370ContextDB.Achievement.Where(x => x.AchievementId == id);

            return existingAchievement.FirstOrDefaultAsync();
        }

        public async Task<Achievement[]> GetAchievementbyonoarderIDAsync(int onboarderID)
        {
            IQueryable<Achievement> course = _inf370ContextDB.Achievement.Where(x => x.OnboarderId == onboarderID);

            return await course.ToArrayAsync();
        }

        public async Task<Achievement[]> GetAchievementcourseIDAsync(int courseid)
        {
            IQueryable<Achievement> course = _inf370ContextDB.Achievement.Where(x => x.CourseId == courseid);

            return await course.ToArrayAsync();
        }

        public async Task<Achievement[]> GetAllAchievementsAsync()
        {
            IQueryable<Achievement> course = _inf370ContextDB.Achievement;

            return await course.ToArrayAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _inf370ContextDB.SaveChangesAsync() > 0;
        }
    }
}
