namespace Lotus.Web
{
    /**
     * \defgroup WebCommonSSE Подсистема SSE
     * \ingroup WebCommon
     * \brief Подсистема SSE.
     * @{
     */
    /// <summary>
    /// Интерфейс события SSE.
    /// </summary>
    /// <typeparam name="TPayload">Тип данных.</typeparam>
    public interface ISseEvent<TPayload>
    {
        /// <summary>
        /// Наименования события.
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// Данные события.
        /// </summary>
        TPayload Payload { get; set; }
    }
    /**@}*/
}