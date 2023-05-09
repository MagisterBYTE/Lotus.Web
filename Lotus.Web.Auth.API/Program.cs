//---------------------------------------------------------------------------------------------------------------------
using Lotus.Web;
using Lotus.Auth.User;
//---------------------------------------------------------------------------------------------------------------------

var builder = WebApplication.CreateBuilder(args);

//
// Базовые сервисы для работы
//
builder.Services.AddCors(x => x.AddDefaultPolicy(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()));
builder.Services.AddOptions();
builder.Services.AddHttpContextAccessor();

//
// Сервисы контролеров и сессии
//
builder.Services.AddControllers();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();

//
// Сервисы базы данных
//
builder.Services.AddLotusCommonServices();
builder.Services.AddLotusUserDatabase(builder.Configuration);

//
// Сервисы аутентификации и авторизации
//
builder.Services.AddLotusAuthServices();
builder.Services.AddLotusUserOpenIddict(null);
builder.Services.AddLotusPermissionsExtension();
builder.Services.AddAuthorizationCore();

var app = builder.Build();

//---------------------------------------------------------------------------------------------------------------------
//
// Конфигурация конвейера обработки запроса
//
//---------------------------------------------------------------------------------------------------------------------
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");

    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseSession();

app.UseCors();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.UseWebSockets();

await app.InitLotusUserDatabase();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapFallbackToFile("index.html");
});

app.Run();
