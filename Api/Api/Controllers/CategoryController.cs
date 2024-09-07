using AutoMapper;
using BusinessLogic.DTO;
using Data.Data;
using Data.Models;
using Data.Models.Input;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public CategoryController(StoreDbContext context, IMapper mapper)
        {
            unitOfWork = new UnitOfWork(context);
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await unitOfWork.CategoryRepository.GetAllAsync();
            return Ok(categories.Select(c => mapper.Map<CategoryDto>(c)));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(Guid id)
        {
            var category = await unitOfWork.CategoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateCategory(CategoryInput categoryInput)
        {
            if (categoryInput == null)
            {
                return BadRequest();
            }
            var category =  await unitOfWork.CategoryRepository.AddAsync(mapper.Map<Category>(categoryInput));
            await unitOfWork.SaveAsync();
            return Ok(mapper.Map<CategoryDto>(category));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCategory(Guid id, CategoryInput? categoryInput)
        {
            var existingCategory = await unitOfWork.CategoryRepository.GetByIdAsync(id);
            if (existingCategory == null)
            {
                return NotFound();
            }
            mapper.Map(categoryInput, existingCategory);

            await unitOfWork.CategoryRepository.Update(existingCategory);
            await unitOfWork.SaveAsync();

            return Ok(mapper.Map<CategoryDto>(existingCategory));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var category = await unitOfWork.CategoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            await unitOfWork.CategoryRepository.DeleteAsync(id);
            await unitOfWork.SaveAsync();
            return Ok(mapper.Map<CategoryDto>(category));
        }   
    }
}
