using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ONBOARDING_SYSTEM.Dtos
{
    public class AddEquipmentypeDto
    {
        [Required]
        [StringLength(50)]
        public string EquipmentTypeDescription { get; set; }
    }
}
