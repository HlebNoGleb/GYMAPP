using AutoMapper;
using GymApp.Shared.DTOs;
using GymApp.Shared.DTOs.Users.Friends;
using GymApp.Shared.Models;
using GymApp.Shared.Models.Friends;
using GymApp.Shared.Models.Users;

namespace GymApp.Core.Mappers;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<User, BasicUserDto>().ReverseMap();
        CreateMap<User, FriendDto>().ReverseMap();
        CreateMap<UserWithFriendshipStatus, BasicUserDtoWithFriendshipStatus>().ReverseMap();
        CreateMap<User, UserDto>().ReverseMap();

        CreateMap(typeof(PagedResult<>), typeof(PagedResult<>)).ConvertUsing(typeof(PagedResultConverter<,>));

        CreateMap<UserAuthDto, User>().ReverseMap();
        CreateMap<UserLoginDto, User>().ReverseMap();
    }
}

public class
    PagedResultConverter<TSource, TDestination> : ITypeConverter<PagedResult<TSource>, PagedResult<TDestination>>
{
    private readonly IMapper _mapper;

    public PagedResultConverter(IMapper mapper)
    {
        _mapper = mapper;
    }

    public PagedResult<TDestination> Convert(PagedResult<TSource> source, PagedResult<TDestination> destination,
        ResolutionContext context)
    {
        return new PagedResult<TDestination>
        {
            Items = _mapper.Map<List<TDestination>>(source.Items), 
            TotalCount = source.TotalCount,
            PageSize = source.PageSize, 
            CurrentPage = source.CurrentPage
        };
    }
}