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
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public ProductController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await unitOfWork.ProductRepository.GetAllWithDetailsAsync();
            var productsDto = mapper.Map<IEnumerable<ProductDto>>(products);
            return Ok(productsDto);
        }
        [HttpGet("{id}")]

        public async Task<IActionResult> GetProduct(Guid id)
        {
            var product = await unitOfWork.ProductRepository.GetByIdWithDetailsAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            var productDto = mapper.Map<ProductDto>(product);
            return Ok(productDto);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProduct(ProductInput productInput)
        {
            var product = mapper.Map<Product>(productInput);
            await unitOfWork.ProductRepository.AddAsync(product);
            await unitOfWork.SaveAsync();
            return Ok(mapper.Map<ProductDto>(product));
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(Guid id, ProductInput productInput)
        {
            var product = await unitOfWork.ProductRepository.GetByIdWithDetailsAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            mapper.Map(productInput, product);
            await unitOfWork.SaveAsync();
            return Ok(mapper.Map<ProductDto>(product));
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var product = await unitOfWork.ProductRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            await unitOfWork.ProductRepository.Delete(product);
            await unitOfWork.SaveAsync();
            return Ok(mapper.Map<ProductDto>(product));
        }
    }
}
