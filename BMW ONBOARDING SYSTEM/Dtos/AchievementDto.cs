using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BMW_ONBOARDING_SYSTEM.Models;


namespace BMW_ONBOARDING_SYSTEM.Dtos
{
    public class AchievementDto
    {
        
      public List<Achievement> onboarderAchievement { get; set; }

        public Onboarder onboarder { get; set; }
  
        public Employee employee { get; set; }
      
    }
}
