using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Lotus.Auth.User.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "adm");

            migrationBuilder.CreateTable(
                name: "Avatar",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SmallImage = table.Column<byte[]>(type: "bytea", nullable: true),
                    FullImage = table.Column<byte[]>(type: "bytea", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Avatar", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Device",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Family = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true),
                    Brand = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Model = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    CodeId = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    IsMobileDevice = table.Column<bool>(type: "boolean", nullable: false),
                    Platform = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Device", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FieldActivity",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    ShortName = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldActivity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Group",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    ShortName = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Group", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OpenIddictApplications",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ClientId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ClientSecret = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyToken = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ConsentType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    DisplayName = table.Column<string>(type: "text", nullable: true),
                    DisplayNames = table.Column<string>(type: "text", nullable: true),
                    Permissions = table.Column<string>(type: "text", nullable: true),
                    PostLogoutRedirectUris = table.Column<string>(type: "text", nullable: true),
                    Properties = table.Column<string>(type: "text", nullable: true),
                    RedirectUris = table.Column<string>(type: "text", nullable: true),
                    Requirements = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictApplications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OpenIddictScopes",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ConcurrencyToken = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Descriptions = table.Column<string>(type: "text", nullable: true),
                    DisplayName = table.Column<string>(type: "text", nullable: true),
                    DisplayNames = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Properties = table.Column<string>(type: "text", nullable: true),
                    Resources = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictScopes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permission",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SystemName = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    DispalyName = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permission", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Post",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    ShortName = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SystemName = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    DispalyName = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OpenIddictAuthorizations",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ApplicationId = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyToken = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Properties = table.Column<string>(type: "text", nullable: true),
                    Scopes = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Subject = table.Column<string>(type: "character varying(400)", maxLength: 400, nullable: true),
                    Type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictAuthorizations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpenIddictAuthorizations_OpenIddictApplications_Application~",
                        column: x => x.ApplicationId,
                        principalSchema: "adm",
                        principalTable: "OpenIddictApplications",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RolePermission",
                schema: "adm",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    PermissionId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermission", x => new { x.RoleId, x.PermissionId });
                    table.ForeignKey(
                        name: "FK_RolePermission_Permission_PermissionId",
                        column: x => x.PermissionId,
                        principalSchema: "adm",
                        principalTable: "Permission",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RolePermission_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "adm",
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Login = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Email = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    Name = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Surname = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Patronymic = table.Column<string>(type: "text", nullable: true),
                    Birthday = table.Column<DateOnly>(type: "date", nullable: true),
                    RoleId = table.Column<int>(type: "integer", nullable: true),
                    RoleSystemName = table.Column<string>(type: "text", nullable: false),
                    PostId = table.Column<int>(type: "integer", nullable: true),
                    AvatarId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Avatar_AvatarId",
                        column: x => x.AvatarId,
                        principalSchema: "adm",
                        principalTable: "Avatar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_User_Post_PostId",
                        column: x => x.PostId,
                        principalSchema: "adm",
                        principalTable: "Post",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_User_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "adm",
                        principalTable: "Role",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OpenIddictTokens",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ApplicationId = table.Column<string>(type: "text", nullable: true),
                    AuthorizationId = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyToken = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ExpirationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Payload = table.Column<string>(type: "text", nullable: true),
                    Properties = table.Column<string>(type: "text", nullable: true),
                    RedemptionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ReferenceId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Subject = table.Column<string>(type: "character varying(400)", maxLength: 400, nullable: true),
                    Type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpenIddictTokens_OpenIddictApplications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalSchema: "adm",
                        principalTable: "OpenIddictApplications",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OpenIddictTokens_OpenIddictAuthorizations_AuthorizationId",
                        column: x => x.AuthorizationId,
                        principalSchema: "adm",
                        principalTable: "OpenIddictAuthorizations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Message",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    Time = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    ReceiverId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Message_User_AuthorId",
                        column: x => x.AuthorId,
                        principalSchema: "adm",
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Message_User_ReceiverId",
                        column: x => x.ReceiverId,
                        principalSchema: "adm",
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Session",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Browser = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    BeginTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: true),
                    DeviceId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Session", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Session_Device_DeviceId",
                        column: x => x.DeviceId,
                        principalSchema: "adm",
                        principalTable: "Device",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Session_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "adm",
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserFieldActivity",
                schema: "adm",
                columns: table => new
                {
                    FieldActivitiesId = table.Column<int>(type: "integer", nullable: false),
                    UsersId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFieldActivity", x => new { x.FieldActivitiesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_UserFieldActivity_FieldActivity_FieldActivitiesId",
                        column: x => x.FieldActivitiesId,
                        principalSchema: "adm",
                        principalTable: "FieldActivity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFieldActivity_User_UsersId",
                        column: x => x.UsersId,
                        principalSchema: "adm",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserGroup",
                schema: "adm",
                columns: table => new
                {
                    GroupsId = table.Column<int>(type: "integer", nullable: false),
                    UsersId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroup", x => new { x.GroupsId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_UserGroup_Group_GroupsId",
                        column: x => x.GroupsId,
                        principalSchema: "adm",
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserGroup_User_UsersId",
                        column: x => x.UsersId,
                        principalSchema: "adm",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "Permission",
                columns: new[] { "Id", "DispalyName", "SystemName" },
                values: new object[,]
                {
                    { 1, "Администрирование системы", "admin" },
                    { 2, "Модератор", "editor" },
                    { 3, "Пользователь", "user" }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "Post",
                columns: new[] { "Id", "Name", "ShortName" },
                values: new object[,]
                {
                    { 1, "Инспектор", "Инспектор" },
                    { 2, "Старший инспектор", "Старший инспектор" },
                    { 3, "Ведущий специалист", "Ведущий специалист" },
                    { 4, "Начальник отдела", "Начальник отдела" }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "Role",
                columns: new[] { "Id", "DispalyName", "SystemName" },
                values: new object[,]
                {
                    { 1, "Администратор", "admin" },
                    { 2, "Редактор", "editor" },
                    { 3, "Пользователь", "user" }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "RolePermission",
                columns: new[] { "PermissionId", "RoleId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 },
                    { 3, 3 }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "User",
                columns: new[] { "Id", "AvatarId", "Birthday", "Email", "EmailConfirmed", "Login", "Name", "PasswordHash", "Patronymic", "PostId", "RoleId", "RoleSystemName", "Surname" },
                values: new object[] { new Guid("e3182c8f-87bc-4e27-a27f-b32e3e2b8018"), null, null, "dementevds@gmail.com", false, "DanielDem", "Даниил", "012f28fd2973783520fa3115f886102a09c8a15e", "Сергеевич", null, 1, "admin", "Дементьев" });

            migrationBuilder.CreateIndex(
                name: "IX_Message_AuthorId",
                schema: "adm",
                table: "Message",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Message_ReceiverId",
                schema: "adm",
                table: "Message",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictApplications_ClientId",
                schema: "adm",
                table: "OpenIddictApplications",
                column: "ClientId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictAuthorizations_ApplicationId_Status_Subject_Type",
                schema: "adm",
                table: "OpenIddictAuthorizations",
                columns: new[] { "ApplicationId", "Status", "Subject", "Type" });

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictScopes_Name",
                schema: "adm",
                table: "OpenIddictScopes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictTokens_ApplicationId_Status_Subject_Type",
                schema: "adm",
                table: "OpenIddictTokens",
                columns: new[] { "ApplicationId", "Status", "Subject", "Type" });

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictTokens_AuthorizationId",
                schema: "adm",
                table: "OpenIddictTokens",
                column: "AuthorizationId");

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictTokens_ReferenceId",
                schema: "adm",
                table: "OpenIddictTokens",
                column: "ReferenceId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_PermissionId",
                schema: "adm",
                table: "RolePermission",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_Session_DeviceId",
                schema: "adm",
                table: "Session",
                column: "DeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_Session_UserId",
                schema: "adm",
                table: "Session",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_User_AvatarId",
                schema: "adm",
                table: "User",
                column: "AvatarId");

            migrationBuilder.CreateIndex(
                name: "IX_User_PostId",
                schema: "adm",
                table: "User",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_User_RoleId",
                schema: "adm",
                table: "User",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFieldActivity_UsersId",
                schema: "adm",
                table: "UserFieldActivity",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroup_UsersId",
                schema: "adm",
                table: "UserGroup",
                column: "UsersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Message",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "OpenIddictScopes",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "OpenIddictTokens",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "RolePermission",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "Session",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserFieldActivity",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserGroup",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "OpenIddictAuthorizations",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "Permission",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "Device",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "FieldActivity",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "Group",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "User",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "OpenIddictApplications",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "Avatar",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "Post",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "Role",
                schema: "adm");
        }
    }
}
