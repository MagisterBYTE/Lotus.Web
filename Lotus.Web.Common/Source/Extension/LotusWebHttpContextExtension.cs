//=====================================================================================================================
// Проект: Общий модуль платформы Web
// Раздел: Методы расширения
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusWebHttpContextExtension.cs
*		Статический класс реализующий методы расширения для работы с контекстом запроса.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Microsoft.Extensions.Primitives;
using Microsoft.Net.Http.Headers;
using System.Net.Http.Headers;
using System.Text.Json;
using UAParser;
//=====================================================================================================================
namespace Lotus
{
	namespace Web
	{
		//-------------------------------------------------------------------------------------------------------------
		/** \addtogroup WebCommonExtension
		*@{*/
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Статический класс реализующий методы расширения для работы с контекстом запроса
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public static class XHttpContextExtension
		{
			private static readonly JsonSerializerOptions Options = new()
			{
				PropertyNameCaseInsensitive = true,
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase
			};

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение токена доступа через контекст запроса
			/// </summary>
			/// <param name="httpContext">Контекст запроса</param>
			/// <returns>Токен доступа</returns>
			//---------------------------------------------------------------------------------------------------------
			public static String GetAccessToken(this HttpContext httpContext)
            {
                var authorization = httpContext.Request.Headers[HeaderNames.Authorization];

                if (AuthenticationHeaderValue.TryParse(authorization, out var headerValue))
                {
                    return headerValue.Parameter ?? String.Empty;
                }

                return String.Empty;
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Инициализация потока для технологии Server Sent Events
			/// </summary>
			/// <param name="httpContext">Контекст запроса</param>
			/// <returns>Задача</returns>
			//---------------------------------------------------------------------------------------------------------
			public static async Task SSEInitAsync(this HttpContext httpContext)
			{
				httpContext.Response.Headers.Add("Cache-Control", "no-cache");
				httpContext.Response.Headers.Add("Content-Type", "text/event-stream");
				await httpContext.Response.Body.FlushAsync();
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Отправка данных по технологии Server Sent Event
			/// </summary>
			/// <param name="httpContext">Контекст запроса</param>
			/// <param name="data">Данные</param>
			/// <returns>Задача</returns>
			//---------------------------------------------------------------------------------------------------------
			public static async Task SSESendDataAsync(this HttpContext httpContext, String data)
			{
				foreach (var line in data.Split('\n'))
				{
					await httpContext.Response.WriteAsync("data: " + line + "\n");
				}

				await httpContext.Response.WriteAsync("\n");
				await httpContext.Response.Body.FlushAsync();
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Отправка события по технологии Server Sent Event
			/// </summary>
			/// <typeparam name="TPayload">Тип данных</typeparam>
			/// <param name="httpContext">Контекст запроса</param>
			/// <param name="payload">Данные</param>
			/// <param name="sseEventName">Имя события</param>
			/// <returns>Задача</returns>
			//---------------------------------------------------------------------------------------------------------
			public static async Task SSESendEventAsync<TPayload>(this HttpResponse httpContext, 
				TPayload payload, String sseEventName)
			{
				await httpContext.WriteAsync($"event: {sseEventName}\n");

				var lines = payload switch
				{
					null => new[] { string.Empty },
					String s => s.Split('\n').ToArray(),
					Exception x => new[] 
					{
						JsonSerializer.Serialize(new { Type = "Exception", x.Message, x.StackTrace }, Options) 
					},
					_ => new[] 
					{
						JsonSerializer.Serialize(payload, Options) 
					}
				};

				foreach (var line in lines)
				{
					await httpContext.WriteAsync($"data: {line}\n");
				}

				await httpContext.WriteAsync("\n");
				await httpContext.Body.FlushAsync();
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Сигнализация об окончании отправки событий по технологии Server Sent Event
			/// </summary>
			/// <param name="httpContext">Контекст запроса</param>
			/// <returns>Задача</returns>
			//---------------------------------------------------------------------------------------------------------
			public static async Task SSESendCloseAsync(this HttpResponse httpContext)
			{
				await httpContext.SSESendEventAsync<Object>(null, "close");
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение устройство входа пользователя через контекст запроса
			/// </summary>
			/// <param name="httpContex">Контекст запроса</param>
			/// <returns>Устройство входа</returns>
			//---------------------------------------------------------------------------------------------------------
			public static Device GetDeviceFromRequest(this HttpContext httpContex)
			{
				if (httpContex.Request.Headers.TryGetValue("User-Agent", out StringValues userAgent))
				{
					// get a parser with the embedded regex patterns
					var uaParser = Parser.GetDefault();

					var client_info = uaParser.Parse(userAgent);

					var device = new Device();
					device.Platform = $"{client_info.OS.Family} {client_info.OS.Major} {client_info.OS.Minor}";
					device.Family = client_info.Device.Family;
					device.Brand = client_info.Device.Brand;
					device.Model = client_info.Device.Model;
					device.SetCodeId();

					return device;
				}

				return new Device();
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение названия браузера пользователя через контекст запроса
			/// </summary>
			/// <param name="httpContex">Контекст запроса</param>
			/// <returns>Названия браузера</returns>
			//---------------------------------------------------------------------------------------------------------
			public static String GetBrowserFromRequest(this HttpContext httpContex)
			{
				if (httpContex.Request.Headers.TryGetValue("User-Agent", out StringValues userAgent))
				{
					// get a parser with the embedded regex patterns
					var uaParser = Parser.GetDefault();

					var client_info = uaParser.Parse(userAgent);

					return client_info.UA.Family;
				}

				return String.Empty;
			}
		}
		//-------------------------------------------------------------------------------------------------------------
		/**@}*/
		//-------------------------------------------------------------------------------------------------------------
	}
}
//=====================================================================================================================