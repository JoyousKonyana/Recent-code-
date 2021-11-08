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
    public class EquipmentBrandController : ControllerBase
    {
        private readonly IEquipmentBrandRepository _brandepository;
        private readonly IMapper _mapper;
        // functionality not implemented yet
        // create a quiz together with a question
        public EquipmentBrandController(IEquipmentBrandRepository brandepository, IMapper mapper)
        {
            _brandepository = brandepository;
            _mapper = mapper;
        }

        //[Authorize(Roles = Role.Admin)]
        [HttpPost]
        [Route("[action]/{userid}")]
        public async Task<ActionResult<CourseViewModel>> CreateEquipmentBrand(int userid, [FromBody] EquipmentBrandViewModel model)
        {
            try
            {
                var equipmentBrand = _mapper.Map<EquipmentBrand>(model);

                _brandepository.Add(equipmentBrand);

                if (await _brandepository.SaveChangesAsync())
                {
                    AuditLog auditLog = new AuditLog();
                    auditLog.AuditLogDescription = "Created equipment brand with name" + ' ' + equipmentBrand.EquipmentBrandName;
                    auditLog.AuditLogDatestamp = DateTime.Now;
                    auditLog.UserId = userid;

                    ////removetimefromdatabase
                    //auditLog.AuditLogTimestamp = TimeSpan.
                    _brandepository.Add(auditLog);
                    if (await _brandepository.SaveChangesAsync())
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

        //[Authorize(Roles = Role.Admin + "," + Role.Onboarder)]
        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<EquipmentBrand>> GetAllEquipmentBrands()
        {
            try
            {
                var brands = await _brandepository.GetAllEquipmentBrandsAsync();

                return Ok(brands);
            }
            catch (Exception)
            {

                BadRequest();
            }
            return BadRequest();
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetEquipmentBrandById(int id)
        {
            try
            {
                var equipmentBrand = await _brandepository.GetEquipmentBrandById(id);
                return Ok(equipmentBrand);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
        //[Authorize(Roles = Role.Admin)]
        [HttpPut("{id}")]
        [Route("[action]/{id}/{userid}")]
        public async Task<ActionResult<EquipmentBrandViewModel>> UpdateEquipmentBrand(int id, int userid, EquipmentBrandViewModel updatedEquipmentbrandModel)
        {
            try
            {
                var existingEquipmentBrand = await _brandepository.GetEquipmentBrandById(id);

                if (existingEquipmentBrand == null) return NotFound($"Could Not find equipment brand ");

                _mapper.Map(updatedEquipmentbrandModel, existingEquipmentBrand);

                if (await _brandepository.SaveChangesAsync())
                {
                    AuditLog auditLog = new AuditLog();
                    auditLog.AuditLogDescription = "Updated equipment brand" + existingEquipmentBrand.EquipmentBrandName + ' ' + "to" + ' ' + updatedEquipmentbrandModel.EquipmentBrandName;
                    auditLog.AuditLogDatestamp = DateTime.Now;
                    auditLog.UserId = userid;
                    return Ok();
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
        public async Task<IActionResult> DeleteEquipmentBrand(int id, int userid)
        {
            try
            {
                var existingQueryStatus = await _brandepository.GetEquipmentBrandById(id);

                if (existingQueryStatus == null) return NotFound();

                _brandepository.Delete(existingQueryStatus);

                if (await _brandepository.SaveChangesAsync())
                {

                    AuditLog auditLog = new AuditLog();
                    auditLog.AuditLogDescription = "deleted equipment brand with name  " + ' ' + existingQueryStatus.EquipmentBrandName;
                    auditLog.AuditLogDatestamp = DateTime.Now;
                    auditLog.UserId = userid;
                    return Ok();
                }
            }
            catch (Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, $"We could not delete the equipment brand");
            }

            return BadRequest();
        }
    }
}
