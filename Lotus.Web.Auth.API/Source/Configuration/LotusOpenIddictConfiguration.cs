//=====================================================================================================================
// Проект: Web API модуля авторизации пользователя
// Раздел: Подсистема конфигурации и инициализации
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusOpenIddictConfiguration.cs
*		Статический класс для конфигурации и инициализации OpenIddict.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using OpenIddict.EntityFrameworkCore.Models;
//=====================================================================================================================
namespace Lotus.Auth
{
	namespace User
    {
		//-------------------------------------------------------------------------------------------------------------
		/** \addtogroup AuthUserApiConfiguration
        *@{*/
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Статический класс для конфигурации и инициализации OpenIddict
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public static class XOpenIddictConfiguration
        {
			#region ======================================= НАСТРОЙКА ТАБЛИЦ ==========================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Установление схем расположения в БД для таблиц сервера OpenIddict
			/// </summary>
			/// <param name="modelBuilder">Построитель моделей</param>
			//---------------------------------------------------------------------------------------------------------
			public static void SetSchemeForTable(ModelBuilder modelBuilder)
			{
				modelBuilder.Entity<OpenIddictEntityFrameworkCoreApplication>()
					.ToTable("OpenIddictApplications", XDbConstants.SchemeName);
				modelBuilder.Entity<OpenIddictEntityFrameworkCoreAuthorization>()
					.ToTable("OpenIddictAuthorizations", XDbConstants.SchemeName);
				modelBuilder.Entity<OpenIddictEntityFrameworkCoreScope>()
					.ToTable("OpenIddictScopes", XDbConstants.SchemeName);
				modelBuilder.Entity<OpenIddictEntityFrameworkCoreToken>()
					.ToTable("OpenIddictTokens", XDbConstants.SchemeName);
			}
			#endregion
		}
		//-------------------------------------------------------------------------------------------------------------
		/**@}*/
		//-------------------------------------------------------------------------------------------------------------
	}
}
//=====================================================================================================================