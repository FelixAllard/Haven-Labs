using Email_Api.Exceptions;
using Email_Api.Model;
using Email_Api.Service;
using Microsoft.AspNetCore.Mvc;

namespace Email_Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TemplateController : ControllerBase
{
    private readonly ITemplateService _templateService;

    public TemplateController(ITemplateService templateService)
    {
        _templateService = templateService;
    }
    [HttpGet("names")]
    public async Task<IActionResult> GetAllTemplatesNames()
    {

        return Ok(_templateService.GetAllTemplatesNames());

        
    }
    [HttpGet]
    public async Task<IActionResult> GetAllTemplates()
    {
        return Ok( _templateService.GetAllTemplates());
    }
    [HttpGet("{name}")]
    public async Task<IActionResult> GetTemplateByName([FromRoute]string name)
    {
        try
        {
            return Ok(_templateService.GetTemplateByName(name));
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(new {message = "No Template with given name" + e.Message });
        }
    }
    [HttpPost]
    public async Task<IActionResult> PostTemplate([FromBody]Template template)
    {
        try
        {
            return Ok(_templateService.PostTemplate(template));
        }
        catch (TemplatesWithIdenticalNamesFound e)
        {
            return BadRequest(new {message = e.Message});
        }
    }
    [HttpPut("{name}")]
    public async Task<IActionResult> PutTemplate([FromRoute]string name, [FromBody]Template template)
    {
        try
        {
            return Ok(_templateService.PutTemplate(name, template));
        }
        catch (UnauthorizedAccessException e)
        {
            return Unauthorized(new {message = e.Message});
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(new {message = "No Template with given name" + e.Message });
        }
    }
    [HttpDelete("{name}")]

    public async Task<IActionResult> DeleteTemplate(string name)
    {
        try
        {
            return Ok(_templateService.DeleteTemplate(name));
        }
        catch (UnauthorizedAccessException e)
        {
            return Unauthorized(new {message = e.Message});
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(new {message = "No Template with given name" + e.Message });
        }
    }
}