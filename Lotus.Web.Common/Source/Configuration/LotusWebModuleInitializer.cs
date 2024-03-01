using Lotus.Repository;

namespace Lotus.Web
{
    /**
     * \defgroup WebCommonConfiguration Подсистема конфигурации и инициализации
     * \ingroup WebCommon
     * \brief Подсистема конфигурации и инициализации.
     * @{
     */
    /// <summary>
    /// Инициализация общего модуля платформы Web.
    /// </summary>
    public static class XModuleInitializer
    {
        /// <summary>
        /// Настройка сервисов общего модуля платформы Web.
        /// </summary>
        /// <param name="services">Коллекция сервисов.</param>
        /// <returns>Коллекция сервисов.</returns>
        public static IServiceCollection AddLotusCommonServices(this IServiceCollection services)
        {
            services.AddScoped<ApiExceptionFilterAttribute>();
            services.AddScoped<ILotusResourceFileService, ResourceFileService>();

            return services;
        }
    }
    /**@}*/
}