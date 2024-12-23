using GymApp.Shared.DTOs;
using GymApp.Shared.Models;
using AutoMapper;

namespace GymApp.Core.Mappers;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<User, UserDto>().ReverseMap();

        CreateMap<UserAuthDto, User>().ReverseMap();
        CreateMap<UserLoginDto, User>().ReverseMap();
        
    }
}