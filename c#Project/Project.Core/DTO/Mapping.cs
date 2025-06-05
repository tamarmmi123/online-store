using AutoMapper;
using Project.Core;
using Project.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DTO
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>()
                .ForMember(dest => dest.ShippingAddress, opt => opt.MapFrom(src => src.User.Address))
                .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.OrderProducts));
            CreateMap<OrderProduct, ProductOrderDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ProductId))
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.ProductName))
                .ForMember(dest => dest.Cost, opt => opt.MapFrom(src => src.Product.Cost))
                .ForMember(dest => dest.ImgSource, opt => opt.MapFrom(src => src.Product.ImgSource))
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity));
        }
    }
}