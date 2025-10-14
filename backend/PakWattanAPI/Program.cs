using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using PakWattanAPI.Data;
using PakWattanAPI.Models;
using PakWattanAPI.Hubs;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database Configuration
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Identity Configuration
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    // Password settings
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;

    // Lockout settings
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    // User settings
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"] ?? throw new InvalidOperationException("JWT SecretKey not configured");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ClockSkew = TimeSpan.Zero
    };
});

// Redis Configuration
builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
{
    var configuration = builder.Configuration.GetConnectionString("Redis");
    return ConnectionMultiplexer.Connect(configuration ?? "localhost:6379");
});

// SignalR Configuration
builder.Services.AddSignalR();

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// AutoMapper (if needed)
// builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// SignalR Hub
app.MapHub<NotificationHub>("/notificationHub");

// Seed database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    
    // Ensure database is created
    context.Database.EnsureCreated();
    
    // Seed initial data
    await SeedDataAsync(context, userManager, roleManager);
}

app.Run();

// Seed Data Method
async Task SeedDataAsync(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
{
    // Create roles if they don't exist
    if (!await roleManager.RoleExistsAsync("Admin"))
    {
        await roleManager.CreateAsync(new IdentityRole("Admin"));
    }
    if (!await roleManager.RoleExistsAsync("Teacher"))
    {
        await roleManager.CreateAsync(new IdentityRole("Teacher"));
    }
    if (!await roleManager.RoleExistsAsync("Student"))
    {
        await roleManager.CreateAsync(new IdentityRole("Student"));
    }

    // Create default admin user
    if (!context.Users.Any())
    {
        var adminUser = new ApplicationUser
        {
            UserName = "admin@pakwattan.edu.pk",
            Email = "admin@pakwattan.edu.pk",
            FirstName = "Admin",
            LastName = "User",
            EmailConfirmed = true,
            IsActive = true
        };

        var result = await userManager.CreateAsync(adminUser, "Admin@123");
        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }
    }

    // Seed basic data
    if (!context.Grades.Any())
    {
        var grades = new[]
        {
            new Grade { Name = "Nursery", Order = 1 },
            new Grade { Name = "Prep", Order = 2 },
            new Grade { Name = "1st", Order = 3 },
            new Grade { Name = "2nd", Order = 4 },
            new Grade { Name = "3rd", Order = 5 },
            new Grade { Name = "4th", Order = 6 },
            new Grade { Name = "5th", Order = 7 },
            new Grade { Name = "6th", Order = 8 },
            new Grade { Name = "7th", Order = 9 },
            new Grade { Name = "8th", Order = 10 },
            new Grade { Name = "9th", Order = 11 },
            new Grade { Name = "10th", Order = 12 },
            new Grade { Name = "11th", Order = 13 },
            new Grade { Name = "12th", Order = 14 }
        };

        context.Grades.AddRange(grades);
    }

    if (!context.Sections.Any())
    {
        var sections = new[]
        {
            new Section { Name = "A", Capacity = 30 },
            new Section { Name = "B", Capacity = 30 },
            new Section { Name = "C", Capacity = 30 },
            new Section { Name = "D", Capacity = 30 }
        };

        context.Sections.AddRange(sections);
    }

    if (!context.Campuses.Any())
    {
        var campus = new Campus
        {
            Name = "Pak Wattan School & College of Sciences",
            Address = "Beside Mubarak plaza, Havelian city, Havelian, Pakistan",
            Phone = "0318 0821377",
            Email = "pakwattan2020@gmail.com",
            PrincipalName = "Principal Name"
        };

        context.Campuses.Add(campus);
    }

    if (!context.Sessions.Any())
    {
        var currentYear = DateTime.Now.Year;
        var session = new Session
        {
            Name = $"{currentYear}-{currentYear + 1}",
            StartYear = currentYear,
            EndYear = currentYear + 1,
            StartDate = new DateTime(currentYear, 4, 1),
            EndDate = new DateTime(currentYear + 1, 3, 31),
            IsCurrent = true
        };

        context.Sessions.Add(session);
    }

    await context.SaveChangesAsync();
}