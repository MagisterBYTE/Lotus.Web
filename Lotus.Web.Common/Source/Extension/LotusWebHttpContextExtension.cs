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
using System.Net;
using System.Net.Http.Headers;
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
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Получение токена доступа через контекст запроса
            /// </summary>
            /// <param name="httpContex">Контекст запроса</param>
            /// <returns>Токен доступа</returns>
            //---------------------------------------------------------------------------------------------------------
            public static String GetAccessToken(this HttpContext httpContex)
            {
                var authorization = httpContex.Request.Headers[HeaderNames.Authorization];

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
			/// <param name="httpContex">Контекст запроса</param>
			/// <returns>Задача</returns>
			//---------------------------------------------------------------------------------------------------------
			public static async Task SSEInitAsync(this HttpContext httpContex)
			{
				httpContex.Response.Headers.Add("Cache-Control", "no-cache");
				httpContex.Response.Headers.Add("Content-Type", "text/event-stream");
				await httpContex.Response.Body.FlushAsync();
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Отправка данных по технологии Server Sent Event
			/// </summary>
			/// <param name="httpContex">Контекст запроса</param>
			/// <param name="data">Данные</param>
			/// <returns>Задача</returns>
			//---------------------------------------------------------------------------------------------------------
			public static async Task SSESendDataAsync(this HttpContext httpContex, String data)
			{
				foreach (var line in data.Split('\n'))
				{
					await httpContex.Response.WriteAsync("data: " + line + "\n");
				}

				await httpContex.Response.WriteAsync("\n");
				await httpContex.Response.Body.FlushAsync();
			}
		}
		//-------------------------------------------------------------------------------------------------------------
		/**@}*/
		//-------------------------------------------------------------------------------------------------------------
	}
}
//=====================================================================================================================