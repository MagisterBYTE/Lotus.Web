//=====================================================================================================================
// Проект: Модуль авторизации пользователя
// Раздел: Подсистема работы с пользователем
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserService.cs
*		Cервис для работы с пользователями.
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
		/** \addtogroup AuthUserUser
		*@{*/
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Cервис для работы с пользователями
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class CUserService : ILotusUserService
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
			public CUserService(CUserDbContext userDbContext)
			{
				mUserDbContext = userDbContext;
			}
			#endregion

			#region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Создание пользователя по указанным данным
			/// </summary>
			/// <param name="userCreate">Параметры для создания/регистрации нового пользователя</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Пользователь</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response<CUserDto>> CreateAsync(CUserCreateDto userCreate, CancellationToken token)
			{
				var user = mUserDbContext.Users.FirstOrDefault(x => x.Login == userCreate.Login);

				if(user is not null) 
				{
					return XResponse.Failed<CUserDto>(XUserConst.LoginAlreadyUse);
				}

				// Создаем нового пользователя
				user = new CUser
				{
					Login = userCreate.Login,
					Email = userCreate.Email,
					PasswordHash = XHashHelper.GetHash(userCreate.Password),
					Name = userCreate.Name,
					Surname = userCreate.Surname,
					Patronymic = userCreate.Patronymic,
					Role = XRoleConstants.User,
					Post = XPositionConstants.Inspector
				};

				mUserDbContext.Users.Add(user);
				await mUserDbContext.SaveChangesAsync(token);

				CUserDto result = user.Adapt<CUserDto>();

				return XResponse.Succeed(result);
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Обновление данных указанного пользователя
			/// </summary>
			/// <param name="userUpdate">Параметры обновляемого пользователя</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Пользователь</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response<CUserDto>> UpdateAsync(CUserDto userUpdate, CancellationToken token)
			{
				CUser user = userUpdate.Adapt<CUser>();

				mUserDbContext.Users.Update(user);
				await mUserDbContext.SaveChangesAsync(token);

				CUserDto result = user.Adapt<CUserDto>();

				return XResponse.Succeed(result);
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение списка пользователей
			/// </summary>
			/// <param name="userRequest">Параметры получения списка</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Cписок пользователей</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<ResponsePage<CUserDto>> GetAllAsync(CUserPositionsDto userRequest, CancellationToken token)
			{
				var query = mUserDbContext.Users.AsQueryable();

				query = query.Filter(userRequest.Filtering);

				query = query.Sort(userRequest.Sorting);

				var result = await query.ToResponsePageAsync<CUser, CUserDto>(userRequest, token);

				return result;
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Удаление пользователя
			/// </summary>
			/// <param name="id">Идентификатор пользователя</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Статус успешности</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Response> DeleteAsync(Guid id, CancellationToken token)
			{
				CUser? user = await mUserDbContext.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken: token);
				if (user == null)
				{
					return XResponse.Failed(XAuthorizeConst.UserNotFound);
				}

				mUserDbContext.Users.Remove(user!);
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