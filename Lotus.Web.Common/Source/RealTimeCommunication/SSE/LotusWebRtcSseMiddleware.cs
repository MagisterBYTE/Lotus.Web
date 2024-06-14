namespace Lotus.Web
{
    /// <summary>
    /// Middleware для сохранения контекста запроса.
    /// </summary>
    public class SseMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ISseService _sse;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="next"></param>
        /// <param name="sse"></param>
        public SseMiddleware(RequestDelegate next, ISseService sse)
        {
            _next = next;
            _sse = sse;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task InvokeAsync(HttpContext context)
        {
            await _sse.AddAsync(context);
        }
    }
}