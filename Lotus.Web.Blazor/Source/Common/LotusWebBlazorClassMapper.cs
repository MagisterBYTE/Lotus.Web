using System.Text;

namespace Lotus.Web
{
    /** \addtogroup WebBlazorCommon
	*@{*/
    /// <summary>
    /// Класс обеспечивающий хранение, управление и доступ к атрибуту класса HTML элемента.
    /// </summary>
    public class CClassMapper : List<string>
    {
        #region Const
        /// <summary>
        /// Разделитель классов.
        /// </summary>
        public const char SEPARATOR = ' ';
        #endregion

        #region Fields
        #endregion

        #region Properties
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует данные списка предустановленными данными.
        /// </summary>
        public CClassMapper()
        {
        }

        /// <summary>
        /// Конструктор инициализирует данные списка указанными данными.
        /// </summary>
        /// <param name="capacity">Начальная максимальная емкость списка.</param>
        public CClassMapper(int capacity)
            : base(capacity)
        {
        }

        /// <summary>
        /// Конструктор инициализирует данные списка указанными данными.
        /// </summary>
        /// <param name="items">Список элементов.</param>
        public CClassMapper(IList<string> items)
            : base(items)
        {
        }

        /// <summary>
        /// Конструктор инициализирует данные списка указанными данными.
        /// </summary>
        /// <param name="class_name">Строка с перечислением классов.</param>
        public CClassMapper(string class_name)
        {
            SetFromString(class_name);
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
        /// Разбор классов CSS из строки и присвоение их объекту.
        /// </summary>
        /// <param name="class_name">Строка с перечислением классов.</param>
        public void SetFromString(string class_name)
        {
            var classes = class_name.Split(SEPARATOR, StringSplitOptions.RemoveEmptyEntries);
            if (classes.Length > 0)
            {
                this.Clear();
                this.AddRange(classes);
            }
        }

        /// <summary>
        /// Разбор классов CSS из строки и добавление их объекту.
        /// </summary>
        /// <param name="class_name">Строка с перечислением классов.</param>
        public void AddFromString(string class_name)
        {
            var classes = class_name.Split(SEPARATOR, StringSplitOptions.RemoveEmptyEntries);
            if (classes.Length > 0)
            {
                this.AddRange(classes);
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
                    return (this[0]);
                }
                else
                {
                    var builder = new StringBuilder(40);
                    for (var i = 0; i < Count; i++)
                    {
                        builder.Append(this[i]);

                        if (i < Count - 1)
                        {
                            builder.Append(SEPARATOR);
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