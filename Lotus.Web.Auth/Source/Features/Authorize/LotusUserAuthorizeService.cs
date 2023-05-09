//=====================================================================================================================
// Проект: Модуль авторизации пользователя
// Раздел: Подсистема авторизации
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserAuthorizeService.cs
*		Сервис для авторизации пользователя.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using System.Security.Claims;
using System.Net;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Core;
using Lotus.Repository;
//=====================================================================================================================
namespace Lotus.Auth
{
	namespace User
	{
		//-------------------------------------------------------------------------------------------------------------
		/** \addtogroup AuthUserAuthorize
		*@{*/
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Сервис для авторизации пользователя
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class CUserAuthorizeService : ILotusUserAuthorizeService
		{
			#region ======================================= ДАННЫЕ ====================================================
			private readonly CUserDbContext mUserDbContext;
			#endregion

			#region ======================================= КОНСТРУКТОРЫ ==============================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Конструктор инициализирует объект класса указанными параметрами
			/// </summary>
			/// <param name="userDbContext">Контекст БД пользователей</param>
			//---------------------------------------------------------------------------------------------------------
			public CUserAuthorizeService(CUserDbContext userDbContext)
			{
				mUserDbContext = userDbContext;
			}
			#endregion

			#region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Аутентификация пользователя
			/// </summary>
			/// <param name="loginParameters">Параметры для аутентификации пользователя</param>
			/// <param name="browser">Браузер входа</param>
			/// <param name="device">Устройство входа</param>
			/// <returns>Набор утверждений</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response<ClaimsPrincipal>> LoginAsync(CLoginParametersDto loginParameters, String browser, CDevice? device)
			{
				// Пробуем найти пользователя с таким именем
				var user = await mUserDbContext.Users.Where(x => (x.Login == loginParameters.Login ||
				x.Email == loginParameters.Login))
					.Include(x => x.Role)
						.ThenInclude(a => a!.Permissions)
					.Include(x => x.Post)
					.Include(x => x.Groups)
					.FirstOrDefaultAsync();

				if (user == null)
				{
					return new Response<ClaimsPrincipal>(XAuthorizeConst.UserNotFound);
				}

				// Проверяем пароль
				var sing_in_result = XHashHelper.VerifyHash(loginParameters.Password, user.PasswordHash);

				if (sing_in_result == false)
				{
					return new Response<ClaimsPrincipal>(XAuthorizeConst.WrongPassword);
				}

				// Сохраняем сессию
				CSession session = new CSession();
				session.Browser = browser;
				session.Device = mUserDbContext.GetDevice(device);
				session.BeginTime = DateTime.UtcNow;
				session.UserId = user!.Id;
				mUserDbContext.Sessions.Add(session);
				await mUserDbContext.SaveChangesAsync();

                // Create a new ClaimsIdentity holding the user identity.
                var identity = new ClaimsIdentity("OpenIddict.Server.AspNetCore");

                user.FillClaims(identity, session.Id.ToString("D"));

                // Создаем новый ClaimsPrincipal, содержащий утверждения,
                // которые будут использоваться для создания id_token, токена или кода.
                var principal = new ClaimsPrincipal(identity);

				return XResponse.Succeed(principal);
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Выход из статуса аутентификации пользователя
			/// </summary>
			/// <param name="accessToken">Токен доступа</param>
			/// <returns>Задача</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task LogoutAsync(String? accessToken)
			{
				if (String.IsNullOrEmpty(accessToken)) return;

				var handler = new JwtSecurityTokenHandler();
				var jwtSecurityToken = handler.ReadJwtToken(accessToken);
				var claims = jwtSecurityToken.Claims;

				var claimSessionId = claims.FirstOrDefault(x => x.Type == XClaimsConstants.UserSessionId);

				if(claimSessionId != null) 
				{
					CSession? session = 
						await mUserDbContext.Sessions.FirstOrDefaultAsync(x => x.Id.ToString("D") == claimSessionId.Value);

					if (session is not null)
					{
						session.EndTime = DateTime.UtcNow;
						mUserDbContext.Update(session);
						mUserDbContext.SaveChanges();
					}
				}
			}
			#endregion
		}
		//-------------------------------------------------------------------------------------------------------------
		/**@}*/
		//-------------------------------------------------------------------------------------------------------------
	}
}
//=====================================================================================================================