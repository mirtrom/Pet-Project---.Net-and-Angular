using AutoMapper;
using BusinessLogic.DTO;
using Data.Models;
using Data.Models.Input;
using Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace Api.Controllers;


[Route("api/[controller]")]
[ApiController]
public class ImageController : ControllerBase
{
    private readonly IImageRepository imageRepository;
    private readonly IMapper mapper;

    public ImageController(IImageRepository imageRepository, IMapper mapper)
    {
        this.imageRepository = imageRepository;
        this.mapper = mapper;
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UploadImage([FromForm] ImageInput imageInput)
    {
        // Validate input
        if (imageInput.File == null || string.IsNullOrWhiteSpace(imageInput.Title))
        {
            return BadRequest("File and title are required.");
        }

        // Create the Image entity
        var image = new Image
        {
            Title = imageInput.Title,
            CreatedAt = DateTime.Now,
            Extension = Path.GetExtension(imageInput.File.FileName).ToLower()
        };

        // Upload the image using the repository
        await imageRepository.Upload(imageInput.File, image);

        // Map and return the response
        return Ok(mapper.Map<ImageDto>(image));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetImage(Guid id)
    {
        // Fetch the image by ID
        var image = await imageRepository.GetByIdAsync(id);
        if (image == null)
        {
            return NotFound();
        }

        // Map and return the response
        return Ok(mapper.Map<ImageDto>(image));
    }

    [HttpGet]
    public async Task<IActionResult> GetImages()
    {
        // Fetch all images
        var images = await imageRepository.GetAllAsync();

        // Map and return the response
        return Ok(mapper.Map<IEnumerable<ImageDto>>(images));
    }
}
