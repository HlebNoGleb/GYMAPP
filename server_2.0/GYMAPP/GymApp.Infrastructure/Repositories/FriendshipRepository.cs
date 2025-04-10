using GymApp.Core.Interfaces;
using GymApp.Infrastructure.DbContextModels;
using GymApp.Shared.Enums;
using GymApp.Shared.Helpers;
using GymApp.Shared.Models;
using GymApp.Shared.Models.Friends;
using GymApp.Shared.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Infrastructure.Repositories;

public class FriendshipRepository(ApplicationDbContext context) : IFriendshipRepository
{
    public async Task TrySaveAsync()
    {
        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            var dbInnerException = ex.InnerException;
            ExeptionHelper.ThrowDbException(dbInnerException);
        }
    }

    public async Task AddRequestAsync(FriendshipRequest friendshipRequest)
    {
        await context.FriendshipRequest.AddAsync(friendshipRequest);
    }

    public async Task AddAsync(Friendship friendship)
    {
        await context.Friendship.AddAsync(friendship);
    }

    public async Task<List<FriendshipRequest>> GetSendedFriendshipRequests(Guid userId)
    {
        return await context.FriendshipRequest
            .Where(fr => fr.FromUserId == userId)
            .Include(fr => fr.ToUser)
            .ToListAsync();
    }

    public async Task<List<FriendshipRequest>> GetReceivedFriendshipRequests(Guid userId)
    {
        return await context.FriendshipRequest
            .Where(fr => fr.ToUserId == userId)
            .Include(fr => fr.FromUser)
            .ToListAsync();
    }

    public async Task RemoveFriendshipRequest(Guid user1Id, Guid user2Id)
    {
        var friendshipRequest = await context.FriendshipRequest
            .Where(fr => (fr.FromUserId == user1Id && fr.ToUserId == user2Id) || (fr.FromUserId == user2Id && fr.ToUserId == user1Id))
            .ToListAsync();
        
        if (friendshipRequest.Count == 0) return;
        
        context.FriendshipRequest.RemoveRange(friendshipRequest);
    }

    public async Task RemoveFriendship(Guid user1Id, Guid user2Id)
    {
        var friendship = await context.Friendship
            .Where(fr => (fr.User1Id == user1Id && fr.User2Id == user2Id) || (fr.User1Id == user2Id && fr.User2Id == user1Id))
            .ToListAsync();
        
        if (friendship.Count == 0) return;
        
        context.Friendship.RemoveRange(friendship);
    }

    public async Task<PagedResult<User>> GetFriends(Guid userId, int pageNumber = 1)
    {
        var query = context.Friendship
            .Where(f => f.User1Id == userId || f.User2Id == userId)
            .Include(f => f.User1)
            .Include(f => f.User2)
            .Select(f => f.User1Id == userId ? f.User2 : f.User1);
        
        var pageResult = new PagedResult<User>
        { 
            CurrentPage = pageNumber 
        };

        var totalCount = await query.CountAsync();
        var items = await query.Skip((pageNumber - 1) * pageResult.PageSize).Take(pageResult.PageSize).ToListAsync();

        pageResult.Items = items;
        pageResult.TotalCount = totalCount;

        return pageResult;
    }

    public async Task<Friendship?> GetFriendship(Guid userId, Guid friendId)
    {
        var friendships = await context.Friendship
            .Where(f => (f.User1Id == userId && f.User2Id == friendId) ||
                        (f.User1Id == friendId && f.User2Id == userId))
            .ToListAsync();
        return friendships.FirstOrDefault();
    }

    public async Task<PagedResult<UserWithFriendshipStatus>> GetUsers(Guid userId, int pageNumber = 1)
    {
        var query = context.Users
            .Include(x => x.EmailConfirmation)
            .Where(x => x.EmailConfirmation.IsEmailConfirmed && x.Visibility == UserVisibility.Public)
            .Include(x => x.FriendRequestsSent)
            .Include(x => x.FriendRequestsReceived)
            .Where(x => x.Id != userId)
            .Select(x => new UserWithFriendshipStatus
                {
                    User = x,
                    Status = x.FriendRequestsSent.Any(fr => fr.ToUserId == userId)
                        ? FriendshipStatus.Received
                        : x.FriendRequestsReceived.Any(fr => fr.FromUserId == userId)
                            ? FriendshipStatus.Sended
                            : context.Friendship.Any(f =>
                                (f.User1Id == x.Id && f.User2Id == userId) ||
                                (f.User1Id == userId && f.User2Id == x.Id))
                                ? FriendshipStatus.Friend
                                : FriendshipStatus.None
                }
            );
        
        var pageResult = new PagedResult<UserWithFriendshipStatus>
        { 
            CurrentPage = pageNumber 
        };

        var totalCount = await query.CountAsync();
        var items = await query.Skip((pageNumber - 1) * pageResult.PageSize).Take(pageResult.PageSize).ToListAsync();

        pageResult.Items = items;
        pageResult.TotalCount = totalCount;

        return pageResult;
    }
}