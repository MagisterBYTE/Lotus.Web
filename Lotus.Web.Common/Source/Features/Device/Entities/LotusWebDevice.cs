using System.ComponentModel.DataAnnotations;

using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Web
{
    /**
     * \defgroup WebCommonDevice Подсистема устройства входа
     * \ingroup WebCommon
     * \brief Подсистема устройства входа.
     * @{
     */
    /// <summary>
    /// Класс для определения устройство входа пользователя.
    /// </summary>
    public class Device : EntityDb<int>
    {
        #region Const
        /// <summary>
        /// Неизвестный параметр устройства.
        /// </summary>
        public const string Unknow = "Unknow";

        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "Device";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="Device"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        /// <param name="schemeName">Схема куда будет помещена таблица.</param>
        public static void ModelCreating(ModelBuilder modelBuilder, string schemeName)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<Device>();
            model.ToTable(TABLE_NAME, schemeName);
        }
        #endregion

        #region Properties
        /// <summary>
        /// Тип устройства.
        /// </summary>
        [MaxLength(40)]
        public string? Family { get; set; }

        /// <summary>
        /// Бренд устройства.
        /// </summary>
        [MaxLength(20)]
        public string? Brand { get; set; }

        /// <summary>
        /// Модель устройства.
        /// </summary>
        [MaxLength(20)]
        public string? Model { get; set; }

        /// <summary>
        /// Код устройства.
        /// </summary>
        [MaxLength(60)]
        public string CodeId { get; private set; } = null!;

        /// <summary>
        /// Статус мобильного устройства.
        /// </summary>
        public bool IsMobileDevice { get; set; }

        /// <summary>
        /// Наименование операционной системы.
        /// </summary>
        public string? Platform { get; set; }
        #endregion

        #region Main methods
        /// <summary>
        /// Установка кода устройства.
        /// </summary>
        public void SetCodeId()
        {
            CodeId = $"{Family ?? Unknow}-{Brand ?? Unknow}-{Model ?? Unknow}";
        }
        #endregion
    }
    /**@}*/
}