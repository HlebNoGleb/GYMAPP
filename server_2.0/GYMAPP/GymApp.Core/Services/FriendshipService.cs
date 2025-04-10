using AutoMapper;
using GymApp.Core.Interfaces;
using GymApp.Shared.DTOs;
using GymApp.Shared.DTOs.Users.Friends;
using GymApp.Shared.Models;
using GymApp.Shared.Models.Friends;
using GymApp.Shared.Models.Users;
using Microsoft.Extensions.Configuration;

namespace GymApp.Core.Services;

public class FriendshipService(
    IFriendshipRepository friendshipRepository, 
    UserService userService,
    IConfiguration configuration,
    IMapper mapper)
{
    public async Task SendFriendshipRequest(Guid fromUserId, Guid toUserId)
    {
        var friendshipRequest = new FriendshipRequest
        {
            FromUserId = fromUserId,
            ToUserId = toUserId
        };
        
        await friendshipRepository.AddRequestAsync(friendshipRequest);
        await friendshipRepository.TrySaveAsync();
    }

    public async Task<List<BasicUserDto>> GetSendedFriendshipRequests(Guid userId)
    {
        var friendshipRequests = await friendshipRepository.GetSendedFriendshipRequests(userId);
        var maybeFriends = friendshipRequests.Select(fr => fr.ToUser).ToList();
        return mapper.Map<List<BasicUserDto>>(maybeFriends);
    }
    
    public async Task<List<BasicUserDto>> GetReceivedFriendshipRequests(Guid userId)
    {
        var friendshipRequests = await friendshipRepository.GetReceivedFriendshipRequests(userId);
        var maybeFriends = friendshipRequests.Select(fr => fr.FromUser).ToList();
        return mapper.Map<List<BasicUserDto>>(maybeFriends);
    }

    public async Task AcceptFriendshipRequest(Guid user1Id, Guid user2Id)
    {
        var friendship = new Friendship
        {
            User1Id = user1Id,
            User2Id = user2Id
        };
        
        await friendshipRepository.AddAsync(friendship);
        
        await friendshipRepository.RemoveFriendshipRequest(user1Id, user2Id);

        await friendshipRepository.TrySaveAsync();
    }

    public async Task RemoveFriendshipRequest(Guid user1Id, Guid user2Id)
    {
        await friendshipRepository.RemoveFriendshipRequest(user1Id, user2Id);
        await friendshipRepository.TrySaveAsync();
    }

    public async Task RemoveFriendship(Guid user1Id, Guid user2Id)
    {
        await friendshipRepository.RemoveFriendship(user1Id, user2Id);
        await friendshipRepository.TrySaveAsync();
    }

    public async Task<PagedResult<FriendDto>> GetFriends(Guid userId, int pageNumber = 1)
    {
        var friendships = await friendshipRepository.GetFriends(userId, pageNumber);
        
        return mapper.Map<PagedResult<FriendDto>>(friendships);
    }
    
    public async Task<FriendDto?> GetFriend(Guid userId, Guid friendId)
    {
        var friendship = await friendshipRepository.GetFriendship(userId, friendId);
        
        return friendship == null ? null : mapper.Map<FriendDto>(friendship);
    }

    public async Task<PagedResult<BasicUserDtoWithFriendshipStatus>> GetUsers(Guid userId, int currentPage)
    {
        var usersWithFriendshipStatus = await friendshipRepository.GetUsers(userId,  currentPage);
        
        var mappedUsersWithFriendshipStatus = mapper.Map<PagedResult<BasicUserDtoWithFriendshipStatus>>(usersWithFriendshipStatus);

        return mappedUsersWithFriendshipStatus;
    }
}