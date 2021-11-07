using BMW_ONBOARDING_SYSTEM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ONBOARDING_SYSTEM.Interfaces
{
    public interface IAchievementRepository
    {
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> SaveChangesAsync();

        Task<Achievement[]> GetAllAchievementsAsync();
     

        Task<Achievement> GetAchievementByIdAsync(int id);

        Task<Achievement[]> GetAchievementbyonoarderIDAsync(int onboarderID);
        Task<Achievement[]> GetAchievementcourseIDAsync(int courseid);
    }
}
