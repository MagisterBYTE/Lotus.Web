//=====================================================================================================================
// Проект: Модуль авторизации пользователя
// Раздел: Подсистема конфигурации и инициализации
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUserDbConfiguration.cs
*		Статический класс для конфигурации и инициализации базы данных.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Microsoft.EntityFrameworkCore;
//=====================================================================================================================
namespace Lotus.Auth
{
	namespace User
	{
		//-------------------------------------------------------------------------------------------------------------
		/**
         * \defgroup AuthUserConfiguration Подсистема конфигурации и инициализации
         * \ingroup AuthUser
         * \brief Подсистема конфигурации и инициализации.
         * @{
         */
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Статический класс для конфигурации и инициализации базы данных
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public static class XDbConfiguration
		{
            //---------------------------------------------------------------------------------------------------------
            /// <summary>
            /// Конфигурация и первоначальная инициализация базы данных
            /// </summary>
            /// <remarks>
            /// Вызывается в <see cref="CUserDbContext.OnModelCreating(ModelBuilder)"/>
            /// </remarks>
            /// <param name="modelBuilder">Интерфейс для построения моделей</param>
            //---------------------------------------------------------------------------------------------------------
            public static void ConfigurationUserDatabase(ModelBuilder modelBuilder)
			{
				CUser.ModelCreating(modelBuilder);
				CPosition.ModelCreating(modelBuilder);
				CRole.ModelCreating(modelBuilder);
				CAvatar.ModelCreating(modelBuilder);
				CMessage.ModelCreating(modelBuilder);
				CGroup.ModelCreating(modelBuilder);
				CFieldActivity.ModelCreating(modelBuilder);
				CDevice.ModelCreating(modelBuilder);
				CSession.ModelCreating(modelBuilder);
				CPermission.ModelCreating(modelBuilder);
                CRolePermission.ModelCreating(modelBuilder);

                // Первоначальная инициализация через миграцию
                XDbSeed.CreatePost(modelBuilder);
                XDbSeed.CreatePermission(modelBuilder);
                XDbSeed.CreateRoles(modelBuilder);
                XDbSeed.CreateRolePermission(modelBuilder);
                XDbSeed.CreateUser(modelBuilder);
            }
        }
		//-------------------------------------------------------------------------------------------------------------
		/**@}*/
		//-------------------------------------------------------------------------------------------------------------
	}
}
//=====================================================================================================================