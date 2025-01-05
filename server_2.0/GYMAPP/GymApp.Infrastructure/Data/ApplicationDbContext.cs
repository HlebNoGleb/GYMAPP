using GymApp.Shared.Models;
using GymApp.Shared.Models.Friends;
using GymApp.Shared.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Infrastructure.DbContextModels;

public sealed class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        Database.EnsureCreatedAsync();
    }

    public DbSet<User> Users { get; set; }
    public DbSet<FriendshipRequest> FriendshipRequest { get; set; }
    public DbSet<Friendship> Friendship { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<UserEmailConfirmation> EmailConfirmations { get; set; }
    public DbSet<UserPasswordReset> PasswordResets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity => { entity.HasIndex(u => u.Email).IsUnique(); });

        // modelBuilder.Entity<FriendRequest>().HasIndex(fr => new { fr.FromUserId, fr.ToUserId }).IsUnique();
        modelBuilder.Entity<FriendshipRequest>().HasKey(fr => new { fr.FromUserId, fr.ToUserId });
        modelBuilder.Entity<FriendshipRequest>()
            .HasOne(fr => fr.FromUser)
            .WithMany(u => u.FriendRequestsSent)
            .HasForeignKey(fr => fr.FromUserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<FriendshipRequest>()
            .HasOne(fr => fr.ToUser)
            .WithMany(u => u.FriendRequestsReceived)
            .HasForeignKey(fr => fr.ToUserId)
            .OnDelete(DeleteBehavior.Restrict);

        
        modelBuilder.Entity<Friendship>().HasKey(f => new { f.User1Id, f.User2Id });
        
        
        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(rt => rt.Id);
            entity.Property(rt => rt.Token).IsRequired();
            entity.Property(rt => rt.Expiration).IsRequired();
            entity.HasOne(rt => rt.User).WithMany(u => u.RefreshTokens).HasForeignKey(rt => rt.UserId);
        });

        modelBuilder.Entity<UserEmailConfirmation>(entity =>
        {
            entity.HasKey(uc => uc.UserId);
            entity.Property(uc => uc.IsEmailConfirmed).IsRequired();
            entity.Property(uc => uc.EmailConfirmationToken).IsRequired();
            entity.Property(uc => uc.EmailConfirmationTokenExpiration).IsRequired();
        });

        modelBuilder.Entity<UserPasswordReset>(entity =>
        {
            entity.HasKey(ur => ur.UserId);
            entity.Property(ur => ur.PasswordResetToken).IsRequired();
            entity.Property(ur => ur.PasswordResetTokenExpiration).IsRequired();
        });
    }
}