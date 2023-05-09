//=====================================================================================================================
// Проект: Модуль авторизации пользователя
// Раздел: Сущности предметной области
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusUser.cs
*		Класс для определения пользователя.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
//---------------------------------------------------------------------------------------------------------------------
using Lotus.Core;
//=====================================================================================================================
namespace Lotus.Auth
{
	namespace User
	{
		//-------------------------------------------------------------------------------------------------------------
		/**
         * \defgroup AuthUserEntities Сущности предметной области
         * \ingroup AuthUser
         * \brief Сущности предметной области модуля.
         * @{
         */
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Класс для определения пользователя
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class CUser : EntityDb<Guid>, IUserInfo
        {
			#region ======================================= КОНСТАНТНЫЕ ДАННЫЕ ========================================
			/// <summary>
			/// Разделитель для формирования строковых список в одну строку
			/// </summary>
			public const Char SeparatorForText = ',';
			#endregion

			#region ======================================= МЕТОДЫ ОПРЕДЕЛЕНИЯ МОДЕЛЕЙ ================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Конфигурирование модели для типа <see cref="CUser"/>
			/// </summary>
			/// <param name="modelBuilder">Интерфейс для построения моделей</param>
			//---------------------------------------------------------------------------------------------------------
			public static void ModelCreating(ModelBuilder modelBuilder)
			{
				modelBuilder.Entity<CUser>()
					.ToTable("User", XDbConstants.SchemeName)
					.HasMany(user => user.FieldActivities)
					.WithMany(field => field.Users)
					.UsingEntity(j => j.ToTable("UserFieldActivity", XDbConstants.SchemeName));

				modelBuilder.Entity<CUser>()
					.HasOne(user => user.Role)
					.WithMany(role => role.Users);

				modelBuilder.Entity<CUser>()
					.HasMany(user => user.Groups)
					.WithMany(group => group.Users)
					.UsingEntity(j => j.ToTable("UserGroup", XDbConstants.SchemeName));

				modelBuilder.Entity<CUser>()
					.HasOne(user => user.Post)
					.WithMany(post => post.Users);

				modelBuilder.Entity<CUser>()
					.HasMany(user => user.Sessions)
					.WithOne(session => session.User);
			}
			#endregion

			#region ======================================= СВОЙСТВА ==================================================
			//
			// ИДЕНТИФИКАЦИЯ
			//
			/// <summary>
			/// Логин пользователя
			/// </summary>
			[MaxLength(10)]
			public String Login { get; set; } = null!;

			/// <summary>
			/// Почта пользователя
			/// </summary>
			[MaxLength(20)]
			public String? Email { get; set; }

			/// <summary>
			/// Статус потверждение почты
			/// </summary>
			public Boolean EmailConfirmed { get; set; }

			/// <summary>
			/// Хэшированное представление пароля
			/// </summary>
			[MaxLength(256)]
			public String PasswordHash { get; set; } = null!;

			//
			// ПЕРСОНАЛЬНЫЕ ДАННЫЕ
			//
			/// <summary>
			/// Имя пользователя
			/// </summary>
			[MaxLength(30)]
			public String? Name { get; set; }

			/// <summary>
			/// Фамилия пользователя
			/// </summary>
			[MaxLength(30)]
			public String? Surname { get; set; }

			/// <summary>
			/// Отчество пользователя
			/// </summary>
			public String? Patronymic { get; set; }

			/// <summary>
			/// Полное имя (ФИО)
			/// </summary>
			[NotMapped]
			public String FullName
			{
				get { return ($"{Surname} {Name} {Patronymic}"); }
			}

			/// <summary>
			/// Краткое имя (Фамилия, инициалы)
			/// </summary>
			[NotMapped]
			public String ShortName
			{
				get
				{
                    return ($"{Surname} {Name?[0]}. {Patronymic?[0]}.");
                }
			}

			/// <summary>
			/// День рождение
			/// </summary>
			public DateOnly? Birthday { get; set; }

			//
			// РОЛЬ И РАЗРЕШЕНИЯ
			//
			/// <summary>
			/// Роль
			/// </summary>
			[ForeignKey(nameof(RoleId))]
			public CRole? Role { get; set; }

			/// <summary>
			/// Идентификатор роли
			/// </summary>
			public Int32? RoleId { get; set; }

            /// <summary>
            /// Служебное наименование роли
            /// </summary>
            public String RoleSystemName
            {
                get
                {
                    if (Role == null)
                    {
                        return ("Нет роли");
                    }
                    else
                    {
                        return (Role.SystemName);
                    }
                }
				set { }
            }

            /// <summary>
            /// Список системных имен разрешений
            /// </summary>
            [NotMapped]
			public ICollection<String> PermissionsSystemNames
			{
				get
				{
					if (Role is not null && Role.Permissions is not null)
					{
						return Role.Permissions.Select(p => p.SystemName).ToHashSet();
					}

					return new HashSet<String>();
				}
			}

			/// <summary>
			/// Список системных имен разрешений в виде текста
			/// </summary>
			[NotMapped]
			public String PermissionsSystemNamesAsText
			{
				get
				{
					if (Role is not null && Role.Permissions is not null)
					{
						return String.Join(SeparatorForText, Role.Permissions.Select(p => p.SystemName).ToArray());
					}

					return String.Empty;
				}
				set { }
			}

			//
			// ДОЛЖНОСТЬ
			//
			/// <summary>
			/// Должность
			/// </summary>
			[ForeignKey(nameof(PostId))]
			public CPosition? Post { get; set; }

			/// <summary>
			/// Идентификатор должности
			/// </summary>
			public Int32? PostId { get; set; }

			/// <summary>
			/// Наименование должности
			/// </summary>
			[NotMapped]
			public String PostShortName
			{
				get
				{
					if (Post is not null && Post.ShortName is not null)
					{
						return (Post.ShortName);
					}
					else
					{
						return ("Нет должности");
					}
				}
				set { }
			}

			//
			// ГРУППЫ
			//
			/// <summary>
			/// Группы пользователя
			/// </summary>
			public List<CGroup>? Groups { get; set; }

			/// <summary>
			/// Список имен групп пользователя
			/// </summary>
			[NotMapped]
			public IReadOnlyList<String> GroupNames
			{
				get
				{
					if (Groups is not null)
					{
						return Groups.Select(x => x.Name).ToArray();
					}
					else
					{
						return new List<String>();
					}
				}
			}

			/// <summary>
			/// Список имен групп пользователя в виде текста
			/// </summary>
			[NotMapped]
			public String GroupNamesAsText
			{
				get
				{
					if (Groups is not null)
					{
						return String.Join(SeparatorForText, Groups.Select(x => x.Name).ToArray());
					}
					else
					{
						return String.Empty;
					}
				}
                set { }
            }

			//
			// CФЕРЫ ДЕЯТЕЛЬНОСТИ
			//
			/// <summary>
			/// Cферы деятельности пользователя
			/// </summary>
			public List<CFieldActivity>? FieldActivities { get; set; }

			/// <summary>
			/// Список имен сфер деятельности пользователя
			/// </summary>
			[NotMapped]
			public IReadOnlyList<String> FieldActivityNames
			{
				get
				{
					if (FieldActivities is not null)
					{
						return FieldActivities.Select(x => x.Name).ToArray();
					}
					else
					{
						return new List<String>();
					}
				}
			}

			/// <summary>
			/// Список имен сфер деятельности пользователя в виде текста
			/// </summary>
			[NotMapped]
			public String FieldActivityNamesAsText
			{
				get
				{
					if (FieldActivities is not null)
					{
						return String.Join(SeparatorForText, FieldActivities.Select(x => x.Name).ToArray());
					}
					else
					{
						return String.Empty;
					}
				}
                set { }
            }

			//
			// СЕССИИ
			//
			/// <summary>
			/// Все сессии
			/// </summary>
			public ICollection<CSession> Sessions { get; set; } = new HashSet<CSession>();

			//
			// АВАТАР
			//
			/// <summary>
			/// Аватар
			/// </summary>
			[ForeignKey(nameof(AvatarId))]
			public CAvatar? Avatar { get; set; }

			/// <summary>
			/// Идентификатор аватарв
			/// </summary>
			public Int32? AvatarId { get; set; }
			#endregion
		}
		//-------------------------------------------------------------------------------------------------------------
		/**@}*/
		//-------------------------------------------------------------------------------------------------------------
	}
}
//=====================================================================================================================