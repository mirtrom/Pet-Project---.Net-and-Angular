using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Data.Data
{
    public class AuthDbContext: IdentityDbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            var readerRoleId = "88eb2aab-6e85-4580-88bf-240c6a7deaec";
            var adminRoleId = "9122bc77-d23e-4460-ba28-d8f93f011049";
            var roles = new List<IdentityRole>
            {
                new IdentityRole{ Id = adminRoleId, Name = "Admin", NormalizedName = "ADMIN", ConcurrencyStamp = adminRoleId },
                new IdentityRole{ Id = readerRoleId, Name = "User", NormalizedName = "USER", ConcurrencyStamp = readerRoleId },
            };

            builder.Entity<IdentityRole>().HasData(roles);

            var adminUserId = "167be992-9f8d-4a35-a24a-6f95b008cb85";
            var admin = new IdentityUser
            {
                Id = adminUserId,
                UserName = "admin@example.com",
                NormalizedUserName = "admin@example.com".ToUpper(),
                Email = "admin@example.com",
                NormalizedEmail = "admin@example.com".ToUpper(),
            };

            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "Admin@123");

            builder.Entity<IdentityUser>().HasData(admin);

            var adminRole = new List<IdentityUserRole<string>> 
            { 
                new IdentityUserRole<string>()
                {
                    RoleId = adminRoleId,
                    UserId = adminUserId
                },
                new IdentityUserRole<string>()
                {
                    RoleId = readerRoleId,
                    UserId = adminUserId
                }
            };

            builder.Entity<IdentityUserRole<string>>().HasData(adminRole);
        }
    }
}