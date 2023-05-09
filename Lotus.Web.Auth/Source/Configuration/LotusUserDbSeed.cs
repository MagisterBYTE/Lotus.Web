//=====================================================================================================================
// Проект: Модуль авторизации пользователя
// Раздел: Подсистема конфигурации и инициализации
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserDbSeed.cs
*		Статический класс для первоначальной инициализации базы данных.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Lotus.Core;

using Microsoft.EntityFrameworkCore;
//=====================================================================================================================
namespace Lotus.Auth
{
    namespace User
    {
		//-------------------------------------------------------------------------------------------------------------
		/** \addtogroup AuthUserConfiguration
        *@{*/
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Статический класс для конфигурации и инициализации базы данных
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public static class XDbSeed
		{
			#region ======================================= МЕТОДЫ СОЗДАНИЯ ===========================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Создание пользователя (сущностей типа <see cref="CUser"/>) - Администратора системы
			/// </summary>
			/// <param name="modelBuilder">Интерфейс для построения моделей</param>
			//---------------------------------------------------------------------------------------------------------
			public static void CreateUser(ModelBuilder modelBuilder)
			{
				// Создаем администратора системы
				String admin_name = "DanielDem";
				String admin_email = "dementevds@gmail.com";
				String admin_password = "!198418dsfA!";

				CUser admin = new CUser
				{
					Id = Guid.Parse("e3182c8f-87bc-4e27-a27f-b32e3e2b8018"),
					Login = admin_name,
					PasswordHash = XHashHelper.GetHash(admin_password),
					Email = admin_email,
					Name = "Даниил",
					Surname = "Дементьев",
					Patronymic = "Сергеевич",
					RoleId = XRoleConstants.Admin.Id
                };

				// Определение для таблицы
				var model = modelBuilder.Entity<CUser>();

				// Данные
				model.HasData(admin);
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Создание ролей (сущностей типа <see cref="CRole"/>) по умолчанию
			/// </summary>
			/// <param name="modelBuilder">Интерфейс для построения моделей</param>
			//---------------------------------------------------------------------------------------------------------
			public static void CreateRoles(ModelBuilder modelBuilder)
			{
				// Определение для таблицы
				var model = modelBuilder.Entity<CRole>();

				// Данные
				model.HasData(XRoleConstants.Admin,
					XRoleConstants.Editor,
					XRoleConstants.User);
			}

			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Создание должностей (сущностей типа <see cref="CPosition"/>) по умолчанию
			/// </summary>
			/// <param name="modelBuilder">Интерфейс для построения моделей</param>
			//---------------------------------------------------------------------------------------------------------
			public static void CreatePost(ModelBuilder modelBuilder)
			{
				// Определение для таблицы
				var model = modelBuilder.Entity<CPosition>();

				// Данные
				model.HasData(
					XPositionConstants.Inspector,
					XPositionConstants.ChiefInspector,
					XPositionConstants.LeadingSpecialist,
					XPositionConstants.DepartmentHead);
			}
			
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Создание разрешений (сущностей типа <see cref="CPermission"/>) по умолчанию
			/// </summary>
			/// <param name="modelBuilder">Интерфейс для построения моделей</param>
			//---------------------------------------------------------------------------------------------------------
			public static void CreatePermission(ModelBuilder modelBuilder)
			{
				// Определение для таблицы
				var model = modelBuilder.Entity<CPermission>();

				// Данные
				model.HasData(XPermissionConstants.Admin,
					XPermissionConstants.Editor,
					XPermissionConstants.User);
            }

            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Создание взаимосвязи между ролью и разрешением (сущностей типа <see cref="CRolePermission"/>) по умолчанию
            /// </summary>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
            public static void CreateRolePermission(ModelBuilder modelBuilder)
            {
                // Определение для таблицы
                var model = modelBuilder.Entity<CRolePermission>();

                // Данные
                model.HasData(
                    new CRolePermission()
                    {
                        RoleId = XRoleConstants.Admin.Id,
                        PermissionId = XPermissionConstants.Admin.Id
                    },
                    new CRolePermission()
                    {
                        RoleId = XRoleConstants.Editor.Id,
                        PermissionId = XPermissionConstants.Editor.Id
                    },
                    new CRolePermission()
                    {
                        RoleId = XRoleConstants.User.Id,
                        PermissionId = XPermissionConstants.User.Id
                    });
            }
            #endregion
        }
		//-------------------------------------------------------------------------------------------------------------
		/**@}*/
		//-------------------------------------------------------------------------------------------------------------
	}
}
//=====================================================================================================================