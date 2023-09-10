//=====================================================================================================================
// Проект: Общий модуль платформы Web
// Раздел: Подсистема контролеров
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusWebControllerBase.cs
*		Базовый контролёр.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using System.Net;
using Microsoft.AspNetCore.Mvc;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Core;
using Lotus.Repository;
//=====================================================================================================================
namespace Lotus
{
	namespace Web
	{
		//-------------------------------------------------------------------------------------------------------------
		/**
         * \defgroup WebCommonController Подсистема контролеров
         * \ingroup WebCommon
         * \brief Подсистема контролеров.
         * @{
         */
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Базовый контролёр 
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		[ApiController]
        [ServiceFilter(typeof(ApiExceptionFilterAttribute))]
        [Route($"{XConstants.PrefixApi}/[controller]")]
		public class ControllerResultBase : ControllerBase
		{
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Отправка ответа с указанными данными.
			/// </summary>
			/// <param name="response">Базовый интерфейс получения данных</param>
			/// <returns>Ответ</returns>
			//---------------------------------------------------------------------------------------------------------
			protected IActionResult SendResponse(ILotusResponse response)
            {
                if(response == null)
                {
                    return BadRequest();
                }

                if(response.Result == null)
                {
                    return Ok(response);
                }

                if (response.Result!.Succeeded)
                {
                    if(response.Result is ILotusResultHttp resultHttp)
                    {
                        switch (resultHttp.HttpCode)
                        {
                            case HttpStatusCode.Created: return Created("", response);
                            case HttpStatusCode.NoContent: return NoContent();
                            default: return Ok(response);
                        }
                    }
                    else
                    {
                        return Ok(response);
                    }
                }
                else
                {
                    if (response.Result is ILotusResultHttp resultHttp)
                    {
                        switch (resultHttp.HttpCode)
                        {
                            case HttpStatusCode.NotFound: return NotFound(response);
                            case HttpStatusCode.Forbidden: return Forbid();
                            default: return BadRequest(response);
                        }
                    }
                    else
                    {
                        return BadRequest(response.Result);
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