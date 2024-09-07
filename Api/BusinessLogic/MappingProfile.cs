using AutoMapper;

namespace BusinessLogic
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Data.Models.Input.ProductInput, Data.Models.Product>();

            CreateMap<Data.Models.Input.CategoryInput, Data.Models.Category>();

            CreateMap<Data.Models.Product, DTO.ProductDto>();

            CreateMap<Data.Models.Category, DTO.CategoryDto>();
            CreateMap<Data.Models.Image, DTO.ImageDto>();
        }
    }
}
