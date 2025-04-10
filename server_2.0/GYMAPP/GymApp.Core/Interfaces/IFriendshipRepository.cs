using GymApp.Shared.DTOs;
using GymApp.Shared.Models;
using GymApp.Shared.Models.Friends;
using GymApp.Shared.Models.Users;

namespace GymApp.Core.Interfaces;

public interface IFriendshipRepository
{
    Task TrySaveAsync();
    Task AddRequestAsync(FriendshipRequest friendshipRequest);
    Task AddAsync(Friendship friendship);
    Task<List<FriendshipRequest>> GetSendedFriendshipRequests(Guid userId);
    Task<List<FriendshipRequest>> GetReceivedFriendshipRequests(Guid userId);
    Task RemoveFriendshipRequest(Guid user1Id, Guid user2Id);
    Task RemoveFriendship(Guid user1Id, Guid user2Id);
    Task<PagedResult<User>> GetFriends(Guid userId, int pageNumber = 1);
    Task<Friendship?> GetFriendship(Guid userId, Guid friendId);
    Task<PagedResult<UserWithFriendshipStatus>> GetUsers(Guid userId, int currentPage);
}