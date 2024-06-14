using System.Text.Json.Serialization;

namespace Lotus.Web
{
    /// <summary>
    /// Базовое сообщение отправляемое через RealTimeCommunication.
    /// </summary>
    public class BaseMessage
    {
        /// <summary>
        /// Идентификатор пользователя который отправил сообщение.
        /// </summary>
        [JsonPropertyName("userId")]
        public string UserId { get; init; } = null!;

        /// <summary>
        /// Тип сообщения.
        /// </summary>
        [JsonPropertyName("messageType")]
        public string MessageType { get; init; } = null!;
    }
}