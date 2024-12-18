using Lotus.Core;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Lotus.Web
{
    /**
     * \defgroup WebCommonFilters Подсистема фильтров
     * \ingroup WebCommon
     * \brief Подсистема фильтров.
     * @{
     */
    /// <summary>
    /// Фильтр для обработки исключений в методах api контроллера.
    /// Для использования в проекте нужно зарегистрировать как сервис services.AddSingleton.ApiExceptionFilter
    /// и вешать как [ServiceFilter(typeof(ApiExceptionFilterAttribute))].
    /// </summary>
    public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
    {
        #region Fields
        private readonly ILogger<ApiExceptionFilterAttribute> _logger;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="logger">Логгер.</param>
        public ApiExceptionFilterAttribute(ILogger<ApiExceptionFilterAttribute> logger)
        {
            _logger = logger;
        }
        #endregion

        #region ExceptionFilterAttribute methods
        /// <summary>
        /// Обработка исключения в асинхронном методе контроллера.
        /// </summary>
        /// <param name="context">Контекст исключения.</param>
        /// <returns>Задача.</returns>
        public override Task OnExceptionAsync(ExceptionContext context)
        {
            ArgumentNullException.ThrowIfNull(context);

            OnException(context);
            return Task.CompletedTask;
        }

        /// <summary>
        /// Обработка исключения в синхронном методе контроллера.
        /// </summary>
        /// <param name="context">Контекст исключения.</param>
        public override void OnException(ExceptionContext context)
        {
            _logger.LogError(context.Exception, "ControllerActionName: {DisplayName}\nRequestPath: {Method} {Path}",
                context.ActionDescriptor.DisplayName, context.HttpContext.Request.Method, context.HttpContext.Request.Path);

            // Преобразуем все исключения к типу Result
            var result = context.Exception.GetResultDefault();
            context.Result = new ObjectResult(result)
            {
                StatusCode = 500
            };
        }
        #endregion
    }
    /**@}*/
}