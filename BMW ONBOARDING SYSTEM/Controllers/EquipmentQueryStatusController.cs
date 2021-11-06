using AutoMapper;
using BMW_ONBOARDING_SYSTEM.Interfaces;
using BMW_ONBOARDING_SYSTEM.Models;
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
    public class EquipmentQueryStatusController : ControllerBase
    {
        private readonly IEquipmentQueryStatusRepository _equipmentQueryStatusRepository;
        private readonly IMapper _mapper;
        // functionality not implemented yet
        // create a quiz together with a question
        public EquipmentQueryStatusController(IEquipmentQueryStatusRepository equipmentQueryStatusRepository, IMapper mapper)
        {
            _equipmentQueryStatusRepository = equipmentQueryStatusRepository;
            _mapper = mapper;
        }
        //[Authorize(Roles = Role.Admin)]
        [HttpPost]
        [Route("[action]/{userid}")]
        public async Task<ActionResult<QueryStatusViewModel>> CreateQueryStatus(int userid, [FromBody] QueryStatusViewModel model)
        {
            try
            {
                var querystatus = _mapper.Map<QueryStatus>(model);

                _equipmentQueryStatusRepository.Add(querystatus);

                if (await _equipmentQueryStatusRepository.SaveChangesAsync())
                {
                    AuditLog auditLog = new AuditLog();
                    auditLog.AuditLogDescription = "Created query status with description" + ' ' + querystatus.EquipmentQueryDescription;
                    auditLog.AuditLogDatestamp = DateTime.Now;
                    auditLog.UserId = userid;

                    ////removetimefromdatabase
                    //auditLog.AuditLogTimestamp = TimeSpan.
                    _equipmentQueryStatusRepository.Add(auditLog);
                    if (await _equipmentQueryStatusRepository.SaveChangesAsync())
                    {
                        return Ok();
                    }

                }
            }
            catch (Exception)
            {

                BadRequest();
            }
            return BadRequest();
        }

        //[Authorize(Roles = Role.Onboarder)]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllQueryStatuses()
        {
            try
            {
                var queryStatuses = await _equipmentQueryStatusRepository.GetAllQueryStatusesAsync();
                return Ok(queryStatuses);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        //[Authorize(Roles = Role.Admin)]
        [HttpPut("{id}")]
        [Route("[action]/{id}/{userid}")]
        public async Task<ActionResult<QueryStatusViewModel>> UpdateQueryStatus(int id, int userid, QueryStatusViewModel updatedQueryStatusModel)
        {
            try
            {
                var existingQuerystatus = await _equipmentQueryStatusRepository.GetQueryStatusByOIDAsync(id);

                if (existingQuerystatus == null) return NotFound($"Could Not find query status ");

                _mapper.Map(updatedQueryStatusModel, existingQuerystatus);

                if (await _equipmentQueryStatusRepository.SaveChangesAsync())
                {
                    AuditLog auditLog = new AuditLog();
                    auditLog.AuditLogDescription = "Updated Course to " + ' ' + updatedQueryStatusModel.EquipmentQueryDescription;
                    auditLog.AuditLogDatestamp = DateTime.Now;
                    auditLog.UserId = userid;
                    return _mapper.Map<QueryStatusViewModel>(existingQuerystatus);
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
        public async Task<IActionResult> DeleteQueryStatus(int id, int userid)
        {
            try
            {
                var existingQuery = await _equipmentQueryStatusRepository.GetQueryStatusByOIDAsync(id);

                if (existingQuery == null) return NotFound();

                _equipmentQueryStatusRepository.Delete(existingQuery);

                if (await _equipmentQueryStatusRepository.SaveChangesAsync())
                {

                    AuditLog auditLog = new AuditLog();
                    auditLog.AuditLogDescription = "Deleted query status to " + ' ' + existingQuery.EquipmentQueryDescription;
                    auditLog.AuditLogDatestamp = DateTime.Now;
                    auditLog.UserId = userid;
                    return Ok();
                }
            }
            catch (Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, $"We could not delete the query status");
            }

            return BadRequest();
        }
    }
}
