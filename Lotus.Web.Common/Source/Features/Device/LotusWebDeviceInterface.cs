namespace Lotus.Web
{
    /** \addtogroup WebCommonDevice
	*@{*/
    /// <summary>
    /// Интерфейс сервиса для работы с устройством входа.
    /// </summary>
    public interface ILotusDeviceService
    {
        /// <summary>
        /// Получение или добавление указанного устройства входа.
        /// </summary>
        /// <param name="device">Устройства входа.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Устройства входа.</returns>
        Task<Device> GetOrAddAsync(Device? device, CancellationToken token);
    }
    /**@}*/
}