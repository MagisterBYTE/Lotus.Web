namespace Lotus.Web
{
    /// <summary>
    /// Extension для механизма Server Sent Events.
    /// </summary>
    public static class XSseExtensions
    {
        /// <summary>
        /// Инициализация потока для технологии Server Sent Events.
        /// </summary>
        /// <param name="httpResponse">Контекст ответа.</param>
        public static void SSEInitAsync(this HttpResponse httpResponse)
        {
            httpResponse.Headers.Append("Cache-Control", "no-cache");
            httpResponse.Headers.Append("Content-Type", "text/event-stream");
            httpResponse.Headers.Append("Connection", "keep-alive");
        }

        /// <summary>
        /// Использовать middleware SseMiddleware для указанного пути.
        /// </summary>
        /// <param name="app">Построитель приложения.</param>
        /// <param name="path">Путь.</param>
        /// <returns>Построитель приложения.</returns>
        public static IApplicationBuilder MapSseService(this IApplicationBuilder app, PathString path)
        {
            return app.Map(path, (app) => app.UseMiddleware<SseMiddleware>());
        }
    }
}