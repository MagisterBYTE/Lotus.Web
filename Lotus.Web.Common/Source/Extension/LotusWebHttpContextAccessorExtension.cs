using System.Security.Claims;

namespace Lotus.Web
{
    /** \addtogroup WebCommonExtension
    *@{*/
    /// <summary>
    /// Статический класс реализующий методы расширения для работы с провайдером контекста HTTP запроса.
    /// </summary>
    public static class XHttpContextAccessorExtension
    {
        /// <summary>
        /// Поиск первого значения утверждения с указанным типом.
        /// </summary>
        /// <param name="httpContexttAccessor">Провайдер контекста HTTP запроса.</param>
        /// <returns>Удостоверение, представленное набором утверждений.</returns>
        public static ClaimsIdentity? GetClaimsIdentity(this IHttpContextAccessor httpContexttAccessor)
        {
            if (httpContexttAccessor.HttpContext != null &&
                httpContexttAccessor.HttpContext.User != null)
            {
                return httpContexttAccessor.HttpContext.User.Identity as ClaimsIdentity;
            }

            return null;
        }
    }
    /**@}*/
}