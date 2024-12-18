using System.Text;

namespace Lotus.Web
{
    /** \addtogroup WebBlazorCommon
	*@{*/
    /// <summary>
    /// Класс обеспечивающий хранение, управление и доступ к атрибуту стиля HTML элемента.
    /// </summary>
    public class CStyleMapper : List<KeyValuePair<string, string>>
    {
        #region Const
        /// <summary>
        /// Разделитель стилей.
        /// </summary>
        public const char SEPARATOR = ';';

        /// <summary>
        /// Пустое значение.
        /// </summary>
        public static readonly KeyValuePair<string, string> Empty;
        #endregion

        #region Static methods
        /// <summary>
        /// Получение свойства и значения стиля CSS.
        /// </summary>
        /// <param name="style">Стиль.</param>
        /// <returns>Пара свойства и значения стиля CSS.</returns>
        public static KeyValuePair<string, string> GetStylePropertyAndValue(string style)
        {
            var find_key = style.IndexOf(':');
            if (find_key > 0 && find_key < style.Length - 2)
            {
                // Свойство есть
                var key = style.Substring(0, find_key);
                var value = style.Substring(find_key + 1).Trim(SEPARATOR);
                return (new KeyValuePair<string, string>(key, value));
            }
            else
            {
                return (Empty);
            }
        }
        #endregion

        #region Fields
        #endregion

        #region Properties
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует данные списка предустановленными данными.
        /// </summary>
        public CStyleMapper()
        {
        }

        /// <summary>
        /// Конструктор инициализирует данные списка указанными данными.
        /// </summary>
        /// <param name="capacity">Начальная максимальная емкость списка.</param>
        public CStyleMapper(int capacity)
            : base(capacity)
        {
        }

        /// <summary>
        /// Конструктор инициализирует данные списка указанными данными.
        /// </summary>
        /// <param name="items">Список элементов.</param>
        public CStyleMapper(IList<KeyValuePair<string, string>> items)
            : base(items)
        {
        }

        /// <summary>
        /// Конструктор инициализирует данные списка указанными данными.
        /// </summary>
        /// <param name="style_name">Строка с перечислением стилей.</param>
        public CStyleMapper(string style_name)
        {
            SetFromString(style_name);
        }
        #endregion

        #region System methods
        /// <summary>
        /// Преобразование к текстовому представлению.
        /// </summary>
        /// <returns>Текстовое представление.</returns>
        public override string ToString()
        {
            return AsString();
        }
        #endregion

        #region Main methods
        /// <summary>
        /// Разбор стиля CSS из строки и присвоение их объекту.
        /// </summary>
        /// <param name="style_name">Строка с перечислением стилей.</param>
        public void SetFromString(string style_name)
        {
            if (string.IsNullOrEmpty(style_name))
            {
                this.Clear();
            }
            else
            {
                var styles = style_name.Split(SEPARATOR, StringSplitOptions.RemoveEmptyEntries);
                if (styles.Length > 0)
                {
                    this.Clear();
                    for (var i = 0; i < styles.Length; i++)
                    {
                        var style = GetStylePropertyAndValue(styles[i]);
                        if (string.IsNullOrEmpty(style.Value) == false)
                        {
                            this.Add(style);
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Разбор стиля CSS из строки и добавление их объекту.
        /// </summary>
        /// <param name="style_name">Строка с перечислением стилей.</param>
        public void AddFromString(string style_name)
        {
            var styles = style_name.Split(SEPARATOR, StringSplitOptions.RemoveEmptyEntries);
            if (styles.Length > 0)
            {
                for (var i = 0; i < styles.Length; i++)
                {
                    var style = GetStylePropertyAndValue(styles[i]);
                    if (string.IsNullOrEmpty(style.Value) == false)
                    {
                        this.Add(style);
                    }
                }
            }
        }

        /// <summary>
        /// Преобразование к текстовому представлению.
        /// </summary>
        /// <returns>Текстовое представление.</returns>
        public string AsString()
        {
            if (Count > 0)
            {
                if (Count == 1)
                {
                    return (this[0].Key + ": " + this[0].Value);
                }
                else
                {
                    var builder = new StringBuilder(40);
                    for (var i = 0; i < Count; i++)
                    {
                        builder.Append(this[i].Key + ": " + this[i].Value);

                        if (i < Count - 1)
                        {
                            builder.Append("; ");
                        }
                    }

                    return (builder.ToString());
                }
            }
            else
            {
                return (string.Empty);
            }
        }
        #endregion
    }
    /**@}*/
}