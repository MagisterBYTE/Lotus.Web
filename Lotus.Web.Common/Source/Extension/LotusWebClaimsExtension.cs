using System.Security.Claims;

namespace Lotus.Web
{
    /**
     * \defgroup WebCommonExtension Методы расширения
     * \ingroup WebCommon
     * \brief Методы расширения.
     * @{
     */
    /// <summary>
    /// Статический класс реализующий методы расширения для работы с утверждениями.
    /// </summary>
    public static class XClaimsExtension
    {
        /// <summary>
        /// Поиск первого значения утверждения с указанным типом.
        /// </summary>
        /// <param name="claims">Список утверждений.</param>
        /// <param name="claimType">Тип утверждения.</param>
        /// <returns>Значение.</returns>
        public static string? FindFirstValue(this IEnumerable<Claim> claims, string claimType)
        {
            foreach (var item in claims)
            {
                if (string.Compare(item.Type, claimType, true) == 0)
                {
                    return item.Value;
                }
            }

            return null;
        }

        /// <summary>
        /// Поиск первого значения утверждения с указанным типом.
        /// </summary>
        /// <param name="claims">Список утверждений.</param>
        /// <param name="claimType">Тип утверждения.</param>
        /// <param name="separator">Разделитель.</param>
        /// <returns>Список уникальный значений.</returns>
        public static HashSet<string> FindFirstValueAsHashSet(this IEnumerable<Claim> claims,
            string claimType, char separator = ',')
        {
            var value = claims.FindFirstValue(claimType);
            if (string.IsNullOrEmpty(value) == false)
            {
                var functions = value.Split([separator], StringSplitOptions.RemoveEmptyEntries).ToArray();
                return new HashSet<string>(functions, StringComparer.OrdinalIgnoreCase);
            }

            return [];
        }
    }
    /**@}*/
}