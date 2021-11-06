using AutoMapper;
using BMW_ONBOARDING_SYSTEM.Dtos;
using BMW_ONBOARDING_SYSTEM.Interfaces;
using BMW_ONBOARDING_SYSTEM.Models;
using BMW_ONBOARDING_SYSTEM.Repositories;
using BMW_ONBOARDING_SYSTEM.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ONBOARDING_SYSTEM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentTypeController : ControllerBase
    {
        private readonly IEquipementTypeRepository _equipmentTypepository;
        private readonly IMapper _mapper;
        // functionality not implemented yet
        // create a quiz together with a question
        public EquipmentTypeController(IEquipementTypeRepository equipmentTypepository, IMapper mapper)
        {
            _equipmentTypepository = equipmentTypepository;
            _mapper = mapper;
        }

        //[Authorize(Roles = Role.Admin + "," + Role.Onboarder)]
        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<EquipmentType>> GetAllEquipmentTypes()
        {
            try
            {
                var types = await _equipmentTypepository.GetAllEquipmentTypesAsync();

                return Ok(types);
            }
            catch (Exception)
            {

                BadRequest();
            }
            return BadRequest();
        }

        //[Authorize(Roles = Role.Admin)]
        [HttpPost]
        [Route("[action]/{userid}")]
        public async Task<ActionResult<AddEquipmentypeDto>> CreateEquipmentType(int userid, [FromBody] AddEquipmentypeDto model)
        {
            try
            {
                var equipmentType = _mapper.Map<EquipmentType>(model);

                _equipmentTypepository.Add(equipmentType);

                if (await _equipmentTypepository.SaveChangesAsync())
                {
                    AuditLog auditLog = new AuditLog();
                    auditLog.AuditLogDescription = "Created" + ' ' + equipmentType.EquipmentTypeDescription + ' ' + "equipment type";
                    auditLog.AuditLogDatestamp = DateTime.Now;
                    auditLog.UserId = userid;

                    ////removetimefromdatabase
                    //auditLog.AuditLogTimestamp = TimeSpan.
                    _equipmentTypepository.Add(auditLog);
                    if (await _equipmentTypepository.SaveChangesAsync())
                    {
                        return Ok("Successfully created equipment type");
                    }

                }
            }
            catch (Exception)
            {

                BadRequest();
            }
            return BadRequest();
        }


        //[Authorize(Roles = Role.Admin)]
        [HttpPut("{id}")]
        [Route("[action]/{id}/{userid}")]
        public async Task<ActionResult<AddEquipmentypeDto>> UpdateEquipmentType(int id, int userid, AddEquipmentypeDto updatedEquipmentTypeModel)
        {
            try
            {
                var existingEquipmentType = await _equipmentTypepository.GetEquipmentTypeByIdAsync(id);

                if (existingEquipmentType == null) return NotFound($"Could Not find equipment type ");

                _mapper.Map(updatedEquipmentTypeModel, existingEquipmentType);

                if (await _equipmentTypepository.SaveChangesAsync())
                {
                    AuditLog auditLog = new AuditLog();
                    auditLog.AuditLogDescription = "Updated Course to " + ' ' + existingEquipmentType.EquipmentTypeDescription;
                    auditLog.AuditLogDatestamp = DateTime.Now;
                    auditLog.UserId = userid;
                    return _mapper.Map<AddEquipmentypeDto>(existingEquipmentType);
                }
            }
            catch (Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }

            return BadRequest();

        }

        //[Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        [Route("[action]/{id}/{userid}")]
        public async Task<IActionResult> DeleteEquipmentType(int id, int userid)
        {
            try
            {
                var existingEquipmentType = await _equipmentTypepository.GetEquipmentTypeByIdAsync(id);

                if (existingEquipmentType == null) return NotFound();

                _equipmentTypepository.Delete(existingEquipmentType);

                if (await _equipmentTypepository.SaveChangesAsync())
                {

                    AuditLog auditLog = new AuditLog();
                    auditLog.AuditLogDescription = "Updated Equipment type  to " + ' ' + existingEquipmentType.EquipmentTypeDescription;
                    auditLog.AuditLogDatestamp = DateTime.Now;
                    auditLog.UserId = userid;
                    return Ok();
                }
            }
            catch (Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, $"We could not delete the  Equipment type");
            }

            return BadRequest();
        }
    }
}
