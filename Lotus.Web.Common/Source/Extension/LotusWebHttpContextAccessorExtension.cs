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
        /// <param name="httpContextAccessor">Провайдер контекста HTTP запроса.</param>
        /// <returns>Удостоверение, представленное набором утверждений.</returns>
        public static ClaimsIdentity? GetClaimsIdentity(this IHttpContextAccessor httpContextAccessor)
        {
            if (httpContextAccessor.HttpContext != null &&
                httpContextAccessor.HttpContext.User != null)
            {
                return httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            }

            return null;
        }
    }
    /**@}*/
}