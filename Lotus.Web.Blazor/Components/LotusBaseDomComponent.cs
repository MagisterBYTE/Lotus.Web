using Microsoft.AspNetCore.Components;

namespace Lotus.Web
{
    /**
     * \defgroup WebBlazorComponents Подсистема компонентов
     * \ingroup WebBlazor
     * \brief Подсистема компонентов.
     * @{
     */
    /// <summary>
    /// Базовой компонент для представления элемента как DOM элемента.
    /// </summary>
    public class LotusBaseDomComponent : ComponentBase
    {
        #region Fields
        // Основные параметры
        protected internal string _id;
        protected internal Dictionary<string, object> _attributes;
        protected internal CClassMapper _classMapper;
        protected internal CStyleMapper _styleMapper;
        #endregion

        #region Properties
        //
        // ОСНОВНЫЕ ПАРАМЕТРЫ
        //
        /// <summary>
        /// Основной идентификатор HTML элемента.
        /// </summary>
        [Parameter]
        public string ID
        {
            get { return (_id); }
            set { _id = value; }
        }

        /// <summary>
        /// Словарь дополнительных атрибутов HTML элемента.
        /// </summary>
        [Parameter(CaptureUnmatchedValues = true)]
        public Dictionary<string, object> Attributes
        {
            get { return (_attributes); }
            set { _attributes = value; }
        }

        /// <summary>
        /// Основной класс HTML элемента.
        /// </summary>
        public CClassMapper ClassMapper
        {
            get { return (_classMapper); }
        }

        /// <summary>
        /// Основной класс HTML элемента.
        /// </summary>
        [Parameter]
        public string Class
        {
            get { return (_classMapper.AsString()); }
            set { _classMapper.SetFromString(value); }
        }

        /// <summary>
        /// Основной стиль HTML элемента.
        /// </summary>
        public CStyleMapper StyleMapper
        {
            get { return (_styleMapper); }
        }

        /// <summary>
        /// Основной стиль HTML элемента.
        /// </summary>
        [Parameter]
        public string Style
        {
            get { return (_styleMapper.AsString()); }
            set { _styleMapper.SetFromString(value); }
        }
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует данные компонента предустановленными данными.
        /// </summary>
        public LotusBaseDomComponent()
        {
            _id = "lotus_id_" + Guid.NewGuid().ToString();
            _classMapper = [];
            _styleMapper = [];
            _attributes = [];
        }
        #endregion
    }
    /**@}*/
}