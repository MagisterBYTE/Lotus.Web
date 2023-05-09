//=====================================================================================================================
// Проект: Модуль авторизации пользователя
// Раздел: Подсистема работы с должностями
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserPositionService.cs
*		Cервис для работы с должностями.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Microsoft.EntityFrameworkCore;
using Mapster;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Core;
using Lotus.Repository;
//=====================================================================================================================
namespace Lotus.Auth
{
	namespace User
	{
		//-------------------------------------------------------------------------------------------------------------
		/** \addtogroup AuthUserPosition
		*@{*/
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Cервис для работы с дожностями
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class CUserPositionService : ILotusUserPositionService
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
			public CUserPositionService(CUserDbContext userDbContext)
			{
				mUserDbContext = userDbContext;
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
			public async Task<Response<CUserPositionDto>> CreateAsync(CUserPositionCreateDto positionCreate, CancellationToken token)
            {
                CPosition post = positionCreate.Adapt<CPosition>();

                mUserDbContext.Posts.Add(post);
                await mUserDbContext.SaveChangesAsync(token);

                CUserPositionDto result = post.Adapt<CUserPositionDto>();

                return XResponse.Succeed(result);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Обновление данных указанной должности
			/// </summary>
			/// <param name="positionUpdate">Параметры обновляемой должности</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Должность</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response<CUserPositionDto>> UpdateAsync(CUserPositionDto positionUpdate, CancellationToken token)
            {
                CPosition post = positionUpdate.Adapt<CPosition>();

                mUserDbContext.Posts.Update(post);
                await mUserDbContext.SaveChangesAsync(token);

                CUserPositionDto result = post.Adapt<CUserPositionDto>();

                return XResponse.Succeed(result);
            }

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение списка должностей
			/// </summary>
			/// <param name="positionRequest">Параметры получения списка</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Cписок должностей</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<ResponsePage<CUserPositionDto>> GetAllAsync(CUserPositionsDto positionRequest, CancellationToken token)
            {
                var query = mUserDbContext.Posts.AsQueryable();

				query = query.Filter(positionRequest.Filtering);

				query = query.Sort(positionRequest.Sorting);

                var result = await query.ToResponsePageAsync<CPosition, CUserPositionDto>(positionRequest, token);

                return result;
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Удаление должности
            /// </summary>
            /// <param name="id">Идентификатор должности</param>
            /// <param name="token">Токен отмены</param>
            /// <returns>Статус успешности</returns>
            //---------------------------------------------------------------------------------------------------------
            public async Task<Response> DeleteAsync(Int32 id, CancellationToken token)
            {
                CPosition? post = await mUserDbContext.Posts.FirstOrDefaultAsync(x => x.Id == id, cancellationToken: token);
                if (post == null)
                {
                    return XResponse.Failed(XPositionConst.NotFound);
                    
                }

                if (post.Id < 4)
                {
                    return XResponse.Failed(XPositionConst.NotDeleteConst);
                }

                mUserDbContext.Posts.Remove(post!);
                await mUserDbContext.SaveChangesAsync(token);

                return XResponse.Succeed();
            }
            #endregion
        }
		//-------------------------------------------------------------------------------------------------------------
		/**@}*/
		//-------------------------------------------------------------------------------------------------------------
	}
}
//=====================================================================================================================