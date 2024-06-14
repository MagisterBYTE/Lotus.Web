using System.Collections.Concurrent;
using System.Text.Json;

namespace Lotus.Web
{
    /// <inheritdoc/>
    public class SseService : ISseService
    {
        private readonly ILogger<SseService> _logger;
        private readonly ConcurrentDictionary<string, SseConnection> _connections = new();

        /// <summary>
        /// Конструктор.
        /// </summary>
        /// <param name="logger">Логгер</param>
        /// <param name="applicationLifetime">Уведомления о событиях жизненного цикла приложения.</param>
        public SseService(ILogger<SseService> logger, IHostApplicationLifetime applicationLifetime)
        {
            _logger = logger;
            applicationLifetime.ApplicationStopping.Register(OnShutdown);
        }

        /// <inheritdoc/>
        public async Task AddAsync(HttpContext context)
        {
            var connectionId = GetConnectionId(context);
            var cancel = new CancellationTokenSource();
            var connection = new SseConnection()
            {
                Response = context.Response,
                Cancel = cancel
            };

            // Если уже есть подключение с таким идентификатор то его надо удалить,
            // так на фронте произошло переподключение и предыдущее уже не актуально
            RemoveConnection(connectionId);

            if (_connections.TryAdd(connectionId, connection))
            {
                // Информируем клиента о подключении
                await EchoAsync(connectionId, connection);
                context.RequestAborted.WaitHandle.WaitOne();
                await Task.FromResult(true);
            }
        }

        /// <inheritdoc/>
        public async Task SendMessageAsync(BaseMessage message)
        {
            var messageJson = JsonSerializer.Serialize(message);
            var removedKeys = new List<string>();

            // Так как мы не знаем какие точно какие подключения активные, а какие нет, а какие нет
            // то нужно пройтись по всем
            foreach (var c in _connections)
            {
                try
                {
                    await c.Value.Response.WriteAsync($"data: {messageJson}\r\r", c.Value.Cancel.Token);
                    await c.Value.Response.Body.FlushAsync(c.Value.Cancel.Token);
                }
                catch (Exception)
                {
                    removedKeys.Add(c.Key);
                }
            }

            if (removedKeys.Count > 0)
            {
                foreach (var key in removedKeys)
                {
                    RemoveConnection(key);
                }
            }
        }

        /// <inheritdoc/>
        public virtual string GetConnectionId(HttpContext context)
        {
            var userId = context.GetClaimValueSubOrDefault() ?? Guid.NewGuid().ToString();
            return userId;
        }

        /// <summary>
        /// Удаление подключение.
        /// </summary>
        /// <param name="id">Идентификатор подключения.</param>
        private void RemoveConnection(string id)
        {
            var target = _connections.FirstOrDefault(c => c.Key == id);
            if (string.IsNullOrEmpty(target.Key))
            {
                return;
            }

            target.Value.Cancel.Cancel();
            _connections.TryRemove(target);
        }

        /// <summary>
        /// Послать сообщение клиенту о том что есть подключение.
        /// </summary>
        /// <param name="clientId">Идентификатор клиента.</param>
        /// <param name="сonnection">Соединение.</param>
        private async Task EchoAsync(string clientId, SseConnection сonnection)
        {
            try
            {
                var clientIdJson = JsonSerializer.Serialize(new ConnectionId { ConnectId = clientId });
                сonnection.Response.SSEInitAsync();

                await сonnection.Response.WriteAsync($"data: {clientIdJson}\r\r", сonnection.Cancel.Token);
                await сonnection.Response.Body.FlushAsync(сonnection.Cancel.Token);
            }
            catch (OperationCanceledException exc)
            {
                _logger.LogError($"Exception {exc.Message}");
            }
        }

        /// <summary>
        /// Завершение работ.
        /// </summary>
        private void OnShutdown()
        {
            var tmpConnections = new List<KeyValuePair<string, SseConnection>>();
            foreach (var c in _connections)
            {
                c.Value.Cancel.Cancel();
                tmpConnections.Add(c);
            }

            foreach (var c in tmpConnections)
            {
                _connections.TryRemove(c);
            }
        }
    }
}