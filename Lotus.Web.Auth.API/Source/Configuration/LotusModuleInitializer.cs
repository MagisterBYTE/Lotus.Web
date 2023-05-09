//=====================================================================================================================
// Проект: Web API модуля авторизации пользователя
// Раздел: Подсистема конфигурации и инициализации
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusModuleInitializer.cs
*		Инициализация модуля пользователя платформы Web.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
//=====================================================================================================================
namespace Lotus.Auth
{
	namespace User
    {
		//-------------------------------------------------------------------------------------------------------------
		/**
         * \defgroup AuthUserApiConfiguration Подсистема конфигурации и инициализации
         * \ingroup AuthUserApi
         * \brief Подсистема конфигурации и инициализации.
         * @{
         */
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Инициализация модуля авторизации платформы Web
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public static class XModuleInitializer
		{
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Настройка сервера OpenIddict
			/// </summary>
			/// <param name="services">Коллекция сервисов</param>
			/// <param name="urlServer">Адрес сервера валидации</param>
			/// <returns>Коллекция сервисов</returns>
			//---------------------------------------------------------------------------------------------------------
			public static IServiceCollection AddLotusUserOpenIddict(this IServiceCollection services, String? urlServer)
			{
				// Register the OpenIddict core components.
				services.AddOpenIddict()
					.AddCore(options =>
					{
						// Configure OpenIddict to use the EF Core stores/models.
						options.UseEntityFrameworkCore()
						.UseDbContext<CUserDbContext>();
					})

					// Register the OpenIddict server components.
					.AddServer(options =>
					{
						options
							.AllowPasswordFlow()            // Пароль
							.AllowClientCredentialsFlow()   // Приложение
							.AllowRefreshTokenFlow()
							.SetAccessTokenLifetime(TimeSpan.FromMinutes(60))
							.SetRefreshTokenLifetime(TimeSpan.FromMinutes(60));

						options
							.SetTokenEndpointUris(XRoutesConstants.TokenEndpoint)
							.SetUserinfoEndpointUris(XRoutesConstants.UserInfoEndpoint);

						options
							.AcceptAnonymousClients();

						options
							.AddEphemeralEncryptionKey()     //  В рабочей среде рекомендуется использовать сертификат X.509
							.AddEphemeralSigningKey()
							.DisableAccessTokenEncryption(); // Отключить шифрование токена

						options.RegisterScopes(new[] { "user", "openid", "offline_access" });

						options
							.UseAspNetCore()
							.DisableTransportSecurityRequirement()
							.EnableTokenEndpointPassthrough()
							.EnableUserinfoEndpointPassthrough();
					})

					// Register the OpenIddict validation components.
					.AddValidation(options =>
					{
						options.UseAspNetCore();
						if (String.IsNullOrEmpty(urlServer))
						{
							options.UseLocalServer();
						}
						else
						{
							options.SetIssuer(urlServer);
							options.UseSystemNetHttp();
						}
					});


                return services;
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Настройка сервисов модуля авторизации пользователя
			/// </summary>
			/// <param name="services">Коллекция сервисов</param>
			/// <returns>Коллекция сервисов</returns>
			//---------------------------------------------------------------------------------------------------------
			public static IServiceCollection AddLotusAuthServices(this IServiceCollection services)
			{
                services.AddScoped<ILotusUserAuthorizeService, CUserAuthorizeService>();
                services.AddScoped<ILotusUserService, CUserService>();
                services.AddScoped<ILotusUserPositionService, CUserPositionService>();

                return services;
			}

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Добавление в коллекцию сервисов базы данных
            /// </summary>
            /// <param name="services">Коллекция сервисов</param>
            /// <param name="configuration">Конфигурация</param>
            /// <returns>Коллекция сервисов</returns>
            //---------------------------------------------------------------------------------------------------------
            public static IServiceCollection AddLotusUserDatabase(this IServiceCollection services, IConfiguration configuration)
            {
                // Добавление CUserDbContext для взаимодействия с базой данных учетных записей
                // Используем для корректной работы OpenIddict
                services.AddDbContext<CUserDbContext>(options =>
                {
                    options.UseOpenIddict();
                    options.UseNpgsql(configuration.GetConnectionString(XDbConstants.ConnectingUserDb),
                        optionsBuilder =>
                        {
                            optionsBuilder.MigrationsHistoryTable(XDbConstants.MigrationHistoryTableName,
                                XDbConstants.SchemeName);
                        });
                });

                return services;
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Инициализация базы данных
            /// </summary>
            /// <param name="application">Построитель web-приложения</param>
			/// <returns>Задача</returns>
            //---------------------------------------------------------------------------------------------------------
            public static async Task InitLotusUserDatabase(this IApplicationBuilder application)
            {
                if (application == null)
                {
                    throw new ArgumentNullException(nameof(application));
                }

                if (application is not null)
                {
                    using var service_scope = application!.ApplicationServices!.GetService<IServiceScopeFactory>()!.CreateScope();
                    using var context = service_scope.ServiceProvider.GetRequiredService<CUserDbContext>();

                    try
                    {
                        await context.Database.MigrateAsync();
                    }
                    catch (Exception exc)
                    {
                        Console.WriteLine(exc.ToString());
                    }
                }
            }
        }
		//-------------------------------------------------------------------------------------------------------------
		/**@}*/
		//-------------------------------------------------------------------------------------------------------------
	}
}
//=====================================================================================================================