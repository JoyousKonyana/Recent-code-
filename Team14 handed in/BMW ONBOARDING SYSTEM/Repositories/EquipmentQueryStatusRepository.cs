using BMW_ONBOARDING_SYSTEM.Interfaces;
using BMW_ONBOARDING_SYSTEM.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ONBOARDING_SYSTEM.Repositories
{
    public class EquipmentQueryStatusRepository : IEquipmentQueryStatusRepository
    {
        private readonly INF370DBContext _inf370ContextDB;

        public EquipmentQueryStatusRepository(INF370DBContext inf370ContextDB)
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


        public async Task<QueryStatus[]> GetAllQueryStatusesAsync()
        {
            IQueryable<QueryStatus> queryStatuses = _inf370ContextDB.QueryStatus;

            return await queryStatuses.ToArrayAsync();
        }

        public async Task<QueryStatus> GetQueryStatusByOIDAsync(int id)
        {
            IQueryable<QueryStatus> queryStatuse = _inf370ContextDB.QueryStatus.Where(x => x.EquipmentQueryStatusId == id);

            return await queryStatuse.FirstOrDefaultAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _inf370ContextDB.SaveChangesAsync() > 0;
        }
    }
}
