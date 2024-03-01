using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Web
{
    /**
     * \defgroup WebCommonSession Подсистема сессии
     * \ingroup WebCommon
     * \brief Подсистема сессии.
     * @{
     */
    /// <summary>
    /// Класс для определения сессии пользователя.
    /// </summary>
    public class Session : EntityDb<Guid>
    {
        #region Const
        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "Session";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="Session"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        /// <param name="schemeName">Схема куда будет помещена таблица.</param>
        public static void ModelCreating(ModelBuilder modelBuilder, string schemeName)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<Session>();
            model.ToTable(TABLE_NAME, schemeName);
        }
        #endregion

        #region Properties
        /// <summary>
        /// Наименование браузера.
        /// </summary>
        [MaxLength(20)]
        public string? Browser { get; set; }

        /// <summary>
        /// Время начало сессии.
        /// </summary>
        public DateTime BeginTime { get; set; }

        /// <summary>
        /// Время окончание сессии.
        /// </summary>
        public DateTime? EndTime { get; set; }

        /// <summary>
        /// Идентификатор пользователя.
        /// </summary>
        public Guid? UserId { get; set; }

        /// <summary>
        /// Устройство для входа.
        /// </summary>
        [ForeignKey(nameof(DeviceId))]
        public Device? Device { get; set; }

        /// <summary>
        /// Идентификатор устройства для входа.
        /// </summary>
        public int? DeviceId { get; set; }
        #endregion
    }
    /**@}*/
}