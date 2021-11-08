using BMW_ONBOARDING_SYSTEM.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ONBOARDING_SYSTEM.Interfaces
{
    public interface IEquipmentQueryStatusRepository
    {
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> SaveChangesAsync();

        Task<QueryStatus[]> GetAllQueryStatusesAsync();
        Task<QueryStatus> GetQueryStatusByOIDAsync(int id);
    }
}
