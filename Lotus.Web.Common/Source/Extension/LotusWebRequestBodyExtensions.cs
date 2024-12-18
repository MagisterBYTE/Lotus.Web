using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace Lotus.Web
{
    /** \addtogroup WebCommonExtension
    *@{*/
    /// <summary>
    /// Статический класс реализующий методы расширения для работы в телом Http запроса.
    /// </summary>
    public static class XRequestBodyExtensions
    {
        /// <summary>
        /// Чтение тела запроса из запроса и возвращает содержимое в виде строки.
        /// </summary>
        /// <param name="httpRequest">HTTP запрос.</param>
        /// <returns>Строка с содержимым тела запроса.</returns>
        public static async ValueTask<string> ReadBodyAsStringAsync([NotNull] this HttpRequest httpRequest)
        {
            httpRequest = httpRequest ?? throw new ArgumentNullException(nameof(httpRequest));

            using var reader = new StreamReader(
                httpRequest.Body,
                encoding: Encoding.UTF8,
                detectEncodingFromByteOrderMarks: false,
                bufferSize: 1024,
                leaveOpen: true);
            var result = await reader.ReadToEndAsync();
            httpRequest.Body.Position = 0;

            return result;
        }
    }
    /**@}*/
}