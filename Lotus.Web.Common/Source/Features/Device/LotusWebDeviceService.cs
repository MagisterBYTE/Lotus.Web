﻿//=====================================================================================================================
// Проект: Общий модуль платформы Web
// Раздел: Подсистема устройства входа
// Автор: MagistrBYTE aka DanielDem <dementevds@gmail.com>
//---------------------------------------------------------------------------------------------------------------------
/** \file LotusWebDeviceService.cs
*		Cервис для работы с устройством входа.
*/
//---------------------------------------------------------------------------------------------------------------------
// Версия: 1.0.0.0
// Последнее изменение от 30.04.2023
//=====================================================================================================================
using Lotus.Repository;
//=====================================================================================================================
namespace Lotus
{
    namespace Web
    {
		//-------------------------------------------------------------------------------------------------------------
		/** \addtogroup WebCommonDevice
		*@{*/
		//-------------------------------------------------------------------------------------------------------------
		/// <summary>
		/// Cервис для работы с устройством входа
		/// </summary>
		//-------------------------------------------------------------------------------------------------------------
		public class DeviceService : ILotusDeviceService
		{
			#region ======================================= ДАННЫЕ ====================================================
			private readonly ILotusDataStorage _dataStorage;
			#endregion

			#region ======================================= КОНСТРУКТОРЫ ==============================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Конструктор инициализирует объект класса указанными параметрами
			/// </summary>
			/// <param name="dataStorage">Интерфейс для работы с сущностями</param>
			//---------------------------------------------------------------------------------------------------------
			public DeviceService(ILotusDataStorage dataStorage)
            {
				_dataStorage = dataStorage;
            }
			#endregion

			#region ======================================= ОБЩИЕ МЕТОДЫ ==============================================
			//---------------------------------------------------------------------------------------------------------
			/// <summary>
			/// Получение или добавление указанного устройства входа
			/// </summary>
			/// <param name="device">Устройства входа</param>
			/// <param name="token">Токен отмены</param>
			/// <returns>Устройства входа</returns>
			//---------------------------------------------------------------------------------------------------------
			public async Task<Device> GetOrAddAsync(Device? device, CancellationToken token)
			{
				var devices = _dataStorage.Query<Device>();
				if (device == null)
				{
					if (devices.Any())
					{
						return devices.First();
					}
					else
					{
						var newDevice = new Device();
						newDevice.SetCodeId();
						await _dataStorage.AddAsync(newDevice);
						await _dataStorage.FlushAsync();

						return newDevice;
					}
				}

				Device? findDevice = devices.Where(x => x.CodeId == device.CodeId).FirstOrDefault();
				if (findDevice is not null)
				{
					return findDevice;
				}

				device.SetCodeId();
				await _dataStorage.AddAsync(device);
				await _dataStorage.FlushAsync();

				return device;
			}
			#endregion
		}
        //-------------------------------------------------------------------------------------------------------------
        /**@}*/
        //-------------------------------------------------------------------------------------------------------------
    }
}
//=====================================================================================================================