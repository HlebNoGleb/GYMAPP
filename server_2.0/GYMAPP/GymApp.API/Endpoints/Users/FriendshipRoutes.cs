using System.Security.Claims;
using GymApp.API.Models;
using GymApp.Core.Services;
using GymApp.Shared.DTOs;
using GymApp.Shared.DTOs.Users.Friends;
using Microsoft.AspNetCore.Authorization;

namespace GymApp.API.Endpoints.Users;

public static class FriendshipRoutes
{
    public static void RegisterRoutes(this WebApplication app)
    {
        app.MapPost("/friendships/sendFriendshipRequest", [Authorize(Policy = "AllRolesPolicy")] 
                async (FriendshipService friendshipService, HttpContext context, string toUserId) =>
            {
                var fromUserId = context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                
                await friendshipService.SendFriendshipRequest(Guid.Parse(fromUserId!), Guid.Parse(toUserId));
                return Results.Ok(new ApiResponse(true, "Friendship request has been sent successfully."));
            })
        .WithTags("Friendship");
        
        app.MapGet("/friendships/getSendedFriendshipRequests", [Authorize(Policy = "UserPolicy")]
            async (FriendshipService friendshipService, HttpContext context) =>
            {
                var userId = context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                
                var friendshipRequestsUsers = await friendshipService.GetSendedFriendshipRequests(Guid.Parse(userId!));

                return Results.Ok(new ApiResponse<List<BasicUserDto>>("", friendshipRequestsUsers));
            })
        .WithTags("Friendship");
        
        app.MapGet("/friendships/getReceivedFriendshipRequests", [Authorize(Policy = "UserPolicy")]
                async (FriendshipService friendshipService, HttpContext context) =>
                {
                    var userId = context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                
                    var friendshipRequestsUsers = await friendshipService.GetReceivedFriendshipRequests(Guid.Parse(userId!));

                    return Results.Ok(new ApiResponse<List<BasicUserDto>>("", friendshipRequestsUsers));
                })
            .WithTags("Friendship");
        
        app.MapPost("/friendships/acceptFriendshipRequest", [Authorize(Policy = "AllRolesPolicy")]
            async (FriendshipService friendshipService, HttpContext context, string userId) =>
            {
                var user2Id = context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                
                await friendshipService.AcceptFriendshipRequest(Guid.Parse(user2Id), Guid.Parse(user2Id));
                return Results.Ok(new ApiResponse(true, "Friendship request has been accepted successfully."));
            })
        .WithTags("Friendship");
        
        app.MapDelete("/friendships/removeFriendshipRequest", [Authorize(Policy = "AllRolesPolicy")]
            async (FriendshipService friendshipService, HttpContext context, string userId) =>
            {
                var user2Id = context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                
                await friendshipService.RemoveFriendshipRequest(Guid.Parse(userId), Guid.Parse(user2Id));
                return Results.Ok(new ApiResponse(true, "Friendship request has been removed successfully."));
            })
        .WithTags("Friendship");
        
        app.MapDelete("/friendships/cancelFriendship", [Authorize(Policy = "AllRolesPolicy")]
            async (FriendshipService friendshipService, HttpContext context, string userId) =>
            {
                var user2Id = context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                
                await friendshipService.RemoveFriendship(Guid.Parse(userId), Guid.Parse(user2Id));
                return Results.Ok(new ApiResponse(true, "Friendship has been removed successfully."));
            })
        .WithTags("Friendship");
        
        app.MapGet("/friendships/getFriends", [Authorize(Policy = "UserPolicy")]
            async (FriendshipService friendshipService, HttpContext context) =>
            {
                var userId = context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                
                var friends = await friendshipService.GetFriends(Guid.Parse(userId!));
                return Results.Ok(new ApiResponse<List<FriendDto>>("", friends));
            })
        .WithTags("Friendship");
        
        app.MapGet("/friendships/getFriend", [Authorize(Policy = "UserPolicy")] 
            async (FriendshipService friendshipService, HttpContext context, string userId) =>
            {
                var user2Id = context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                
                var friend = await friendshipService.GetFriend(Guid.Parse(userId), Guid.Parse(user2Id!));
                
                return friend is null 
                    ? Results.NotFound(new ErrorApiResponse("Friend not found")) 
                    : Results.Ok(new ApiResponse<FriendDto>("", friend));
            })
        .WithTags("Friendship");
    }

}