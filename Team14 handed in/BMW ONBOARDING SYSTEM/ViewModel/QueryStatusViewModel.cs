using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ONBOARDING_SYSTEM.ViewModel
{
    public class QueryStatusViewModel
    {
        [StringLength(50)]
        public string EquipmentQueryDescription { get; set; }
    }
}
