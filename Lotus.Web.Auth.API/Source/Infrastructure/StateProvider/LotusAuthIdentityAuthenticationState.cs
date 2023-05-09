//=====================================================================================================================
// Проект: Web API модуля авторизации пользователя
// Раздел: Подсистема инфраструктуры
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusAuthIdentityAuthenticationState.cs
*		Класс для информирования о состоянии валидации пользователя для компонентов Razor.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using System.Security.Claims;
using IdentityModel.Client;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Server;
using Newtonsoft.Json;
//=====================================================================================================================
namespace Lotus.Auth
{
	namespace User
	{
		//-------------------------------------------------------------------------------------------------------------
		/**
         * \defgroup AuthUserApiInfrastructure Подсистема инфраструктуры
         * \ingroup AuthUserApi
         * \brief Подсистема инфраструктуры.
         * @{
         */
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Класс для информирования о состоянии валидации пользователя для компонентов Razor
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class CIdentityAuthenticationStateProvider : ServerAuthenticationStateProvider
		{
			#region ======================================= ДАННЫЕ ====================================================
			private readonly HttpClient mHttpClient;
			private readonly IHttpContextAccessor mHttpContextAccessor;
			private CUserAuthorizeInfo? mUserInfo;
			#endregion

			#region ======================================= КОНСТРУКТОРЫ ==============================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Конструктор инициализирует объект класса указанными параметрами
			/// </summary>
			/// <param name="configuration">Параметры конфигурации</param>
			/// <param name="httpContextAccessor">Провайдер контекста HTTP запроса</param>
			//---------------------------------------------------------------------------------------------------------
			public CIdentityAuthenticationStateProvider(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
			{
				var server_uri = configuration.GetSection("Authorization").GetValue<String>(XRoutesConstants.ServerUri);
				mHttpClient = new HttpClient();
				mHttpClient.BaseAddress = new Uri(server_uri);
				mHttpContextAccessor = httpContextAccessor;
			}
			#endregion

			#region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Аутентификация пользователя
			/// </summary>
			/// <param name="loginParameters">Параметры для аутентификации пользователя</param>
			/// <returns>Задача</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task Login(CLoginParametersDto loginParameters)
			{
				var httpContex = mHttpContextAccessor.HttpContext;

				// Прокидываем все заголовки от браузера
				// которые нужны для последующей идентификации пользователя
				foreach (var item in httpContex!.Request.Headers)
				{
					if (!mHttpClient.DefaultRequestHeaders.Contains(item.Key))
					{
						mHttpClient.DefaultRequestHeaders.Add(item.Key, item.Value.ToString());
					}
				}

				try
				{
					var tokenResponse = await mHttpClient.RequestPasswordTokenAsync(new PasswordTokenRequest
					{
						Address = XRoutesConstants.TokenEndpoint,
						UserName = loginParameters.Login,
						Password = loginParameters.Password,
					});

					if (tokenResponse.IsError)
					{
						throw new Exception(tokenResponse.Error);
					}

					mUserInfo = new CUserAuthorizeInfo();
					mUserInfo.SetThisFrom(tokenResponse.AccessToken);
                    mUserInfo.IsAuthenticated = true;

					NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
				}
				catch (Exception)
				{
					throw;
				}
			}

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Регистрация пользователя
            /// </summary>
            /// <param name="registerParameters">Параметры для регистрации нового пользователя</param>
            /// <returns>Задача</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task Register(CUserCreateDto registerParameters)
			{
				try
				{
					var response = await mHttpClient.PostAsJsonAsync(XRoutesConstants.RegisterEndpoint, registerParameters);

					response.EnsureSuccessStatusCode();

					NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
				}
				catch (Exception)
				{
					throw;
				}
			}

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Выход из статуса аутентификации пользователя
            /// </summary>
            /// <returns>Задача</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task Logout()
			{
				try
				{
					var result = await mHttpClient.PostAsync(XRoutesConstants.LogoutEndpoint, null);
					mUserInfo = null;
					NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
				}
				catch (Exception)
				{
					throw;
				}
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение информации о статусе аутентификации текущего пользователя
			/// </summary>
			/// <returns>Информация о статусе аутентификации текущего пользователя</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<CUserAuthorizeInfo> GetUserAuthorizeInfo()
			{
				if (mUserInfo != null && mUserInfo.IsAuthenticated)
				{
					return mUserInfo;
				}

				//mIsSending = true;
				var requestMessage = new HttpRequestMessage();
				requestMessage.RequestUri = new Uri(mHttpClient.BaseAddress + "api/Authorize/UserAuthorizeInfo");

				try
				{
					var response = await mHttpClient.SendAsync(requestMessage);
					response.EnsureSuccessStatusCode();

					string responseBody = await response.Content.ReadAsStringAsync();
					var authorizeInfo = JsonConvert.DeserializeObject<CUserAuthorizeInfo>(responseBody);

					mUserInfo = authorizeInfo;
				}
				catch (Exception)
				{
					throw;
				}

				return mUserInfo!;
			}
			#endregion

			#region ======================================= ПЕРЕГРУЖЕННЫЕ МЕТОДЫ ======================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение состояния аутентификации пользователя
			/// </summary>
			/// <returns>Состояние аутентификации пользователя</returns>
			//---------------------------------------------------------------------------------------------------------
			public override Task<AuthenticationState> GetAuthenticationStateAsync()
			{
				var identity = new ClaimsIdentity();

				if (mUserInfo != null && mUserInfo.IsAuthenticated)
				{
					identity = new ClaimsIdentity("Server authentication");
                    mUserInfo.FillClaims(identity);
                }

				return Task.FromResult(new AuthenticationState(new ClaimsPrincipal(identity)));
			}
			#endregion
		}
		//-------------------------------------------------------------------------------------------------------------
		/**@}*/
		//-------------------------------------------------------------------------------------------------------------
	}
}
//=====================================================================================================================