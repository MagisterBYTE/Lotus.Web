using Lotus.Repository;

using Microsoft.AspNetCore.Mvc;

namespace Lotus.Web
{
    /**
     * \defgroup WebCommonResourceFile Подсистема файловых ресурсов
     * \ingroup WebCommon
     * \brief Подсистема файловых ресурсов.
     * @{
     */
    /// <summary>
    /// Контролёр для работы с файлами.
    /// </summary>
    public class ResourceFileController : ControllerResultBase
    {
        #region Fields
        private readonly ILotusResourceFileService _fileService;
        private readonly ILogger<ResourceFileController> _logger;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="fileService">Интерфейс сервиса для работы с файлами.</param>
        /// <param name="logger">Интерфейс сервиса логгера.</param>
        public ResourceFileController(ILotusResourceFileService fileService, ILogger<ResourceFileController> logger)
        {
            _fileService = fileService;
            _logger = logger;
        }
        #endregion

        #region Main methods
        /// <summary>
        /// Создание/загрузка файла по указанным данным.
        /// </summary>
        /// <param name="fileCreate">Параметры для создания файла.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Файл.</returns>
        [HttpPost("create")]
        [ProducesResponseType(typeof(Response<FileDto>), StatusCodes.Status201Created)]
        public async Task<IActionResult> Create([FromBody] FileCreateLocalRequest fileCreate, CancellationToken token)
        {
            var result = await _fileService.CreateAsync(fileCreate, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Получение указанного файла в формате Base64.
        /// </summary>
        /// <param name="id">Идентификатор файла.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Файл в формате Base64.</returns>
        [HttpGet("getBase64")]
        [ProducesResponseType(typeof(Response<FileBase64Dto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetBase64([FromQuery] Guid id, CancellationToken token)
        {
            var result = await _fileService.GetBase64Async(id, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Получение списка файлов в формате Base64.
        /// </summary>
        /// <param name="filesRequest">Параметры получения списка.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Список файлов в формате Base64.</returns>
        [HttpGet("getAllBase64")]
        [ProducesResponseType(typeof(ResponsePage<FileBase64Dto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllBase64([FromQuery] FilesRequest filesRequest, CancellationToken token)
        {
            var result = await _fileService.GetAllBase64Async(filesRequest, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Удаление файла.
        /// </summary>
        /// <param name="id">Идентификатор файла.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Статус успешности.</returns>
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete([FromQuery] Guid id, CancellationToken token)
        {
            var result = await _fileService.DeleteAsync(id, token);
            return SendResponse(result);
        }
        #endregion
    }
    /**@}*/
}