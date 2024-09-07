using Data.Data;
using Microsoft.EntityFrameworkCore;
using BusinessLogic;
using Data.Repositories.Interfaces;
using Data.Repositories.Implementations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("StoreConnection"));
});

builder.Services.AddDbContext<AuthDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("IdentityConnection"));
});

builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<ITokenRepository, TokenRepository>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddIdentityCore<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>("Provider")
    .AddEntityFrameworkStores<AuthDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredUniqueChars = 1;
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            AuthenticationType = "Jwt",
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        policyBuilder =>
        {
            policyBuilder.WithOrigins("http://localhost:4200")
                         .AllowAnyHeader()
                         .AllowAnyMethod();
        });
});



var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigins");
app.UseAuthorization();

app.MapControllers();

app.Run();
