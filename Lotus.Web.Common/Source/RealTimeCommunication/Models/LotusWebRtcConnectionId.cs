using System.Text.Json.Serialization;

namespace Lotus.Web
{
    /// <summary>
    /// Идентификатор подключения.
    /// </summary>
    public record ConnectionId
    {
        /// <summary>
        /// Идентификатор подключения.
        /// </summary>
        [JsonPropertyName("сonnectionId")]
        public string ConnectId { get; init; } = null!;
    }
}