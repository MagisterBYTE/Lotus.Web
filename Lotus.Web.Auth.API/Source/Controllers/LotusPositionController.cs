//=====================================================================================================================
// Проект: Web API модуля авторизации пользователя
// Раздел: Подсистема контролеров
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusPositionController.cs
*		Контролёр для работы с должностями.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Lotus.Core;
using Lotus.Repository;
using System.Net;
using Microsoft.AspNetCore.Mvc;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Web;
//=====================================================================================================================
namespace Lotus.Auth
{
	namespace User
	{
		//-------------------------------------------------------------------------------------------------------------
		/** \addtogroup AuthUserApiController
		*@{*/
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Контролёр для работы с пользователями
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class PositionController : ControllerResultBase
		{
			#region ======================================= ДАННЫЕ ====================================================
			private readonly ILotusUserPositionService mPositionService;
            private readonly ILogger<PositionController> mLogger;
			#endregion

			#region ======================================= КОНСТРУКТОРЫ ==============================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Конструктор инициализирует объект класса указанными параметрами
			/// </summary>
			/// <param name="positionService">Интерфейс сервиса для работы с должностями</param>
			/// <param name="logger">Интерфейс сервиса для работы с пользователем</param>
			//---------------------------------------------------------------------------------------------------------
			public PositionController(ILotusUserPositionService positionService, ILogger<PositionController> logger)
			{
                mPositionService = positionService;
				mLogger = logger;
            }
			#endregion

			#region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Создание должности по указанным данным
			/// </summary>
			/// <param name="positionCreate">Параметры для создания должности</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Должность</returns>
			//---------------------------------------------------------------------------------------------------------
			[HttpPost("create")]
            [ProducesResponseType(typeof(Response<CUserPositionDto>), StatusCodes.Status201Created)]
            public async Task<IActionResult> Create([FromBody] CUserPositionCreateDto positionCreate, CancellationToken token)
			{
                var result = await mPositionService.CreateAsync(positionCreate, token);
                return SendResponse(result);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Обновление данных указанной должности
			/// </summary>
			/// <param name="positionUpdate">Параметры обновляемой должности</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Должность</returns>
			//---------------------------------------------------------------------------------------------------------
			[HttpPut("update")]
            [ProducesResponseType(typeof(Response<CUserPositionDto>), StatusCodes.Status200OK)]
            public async Task<IActionResult> Update([FromBody] CUserPositionDto positionUpdate, CancellationToken token)
            {
                var result = await mPositionService.UpdateAsync(positionUpdate, token);
                return SendResponse(result);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение списка должностей
			/// </summary>
			/// <param name="positionRequest">Параметры получения списка</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Cписок должностей</returns>
			//---------------------------------------------------------------------------------------------------------
			[HttpGet("getall")]
            [ProducesResponseType(typeof(ResponsePage<CUserPositionDto>), StatusCodes.Status200OK)]
            public async Task<IActionResult> GetAll([FromQuery] CUserPositionsDto positionRequest, CancellationToken token)
            {
                var result = await mPositionService.GetAllAsync(positionRequest, token);
                return SendResponse(result);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Удаление должности
			/// </summary>
			/// <param name="id">Идентификатор должности</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Статус успешности</returns>
			//---------------------------------------------------------------------------------------------------------
			[HttpDelete("delete")]
            public async Task<IActionResult> Delete([FromQuery] Int32 id, CancellationToken token)
            {
                var result = await mPositionService.DeleteAsync(id, token);
                return SendResponse(result);
            }
            #endregion
        }
		//-------------------------------------------------------------------------------------------------------------
		/**@}*/
		//-------------------------------------------------------------------------------------------------------------
	}
}
//=====================================================================================================================