using GymApp.Shared.DTOs;
using GymApp.Shared.Models.Friends;

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
    Task<List<Friendship>> GetFriendships(Guid userId);
    Task<Friendship?> GetFriendship(Guid userId, Guid friendId);
}