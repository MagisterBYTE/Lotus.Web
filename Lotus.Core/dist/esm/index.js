import axios from 'axios';
import numeral from 'numeral';

class ArrayHelper {
    /**
     * Получить числовой массив в указанном диапазоне
     * @param from Начальное значение
     * @param to Конечное значение
     * @returns Числовой массив
     */
    static getNumberArrayFromTo(from, to) {
        const result = [];
        for (let i = from; i <= to; i++) {
            result.push(i);
        }
        return result;
    }
    /**
     * Проверка массива что он является строго числовым
     * @param array Проверяемый массив
     * @returns Статус проверки
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static checkIsNumbers(array) {
        return array.every((element) => {
            return typeof element === 'number';
        });
    }
    /**
     * Проверка на вхождение любого элемента проверяемого массива в исходном массиве
     * @param source Исходный массив
     * @param checked Проверяемый массив
     * @returns Статус проверки
     */
    static checkInArrayAny(source, checked) {
        let find = true;
        for (const element of source) {
            find = checked.includes(element);
            if (find) {
                break;
            }
        }
        return find;
    }
    /**
     * Группировка массива по указанному свойству
     * @param source Исходный массив
     * @param propertyName Имя свойства по которому будет произведена группировка
     * @returns Массив групп
     */
    static groupByProperty(source, propertyName) {
        const result = [];
        source.forEach((element) => {
            // @ts-expect-error propertyName
            const key = element[propertyName];
            const exist = result.find((x) => x.groupKey === key);
            if (exist) {
                exist.items.push(element);
            }
            else {
                const newUserGroup = { groupKey: key, items: [element] };
                result.push(newUserGroup);
            }
        });
        return result;
    }
}

class BooleanHelper {
    /**
     * Текстовые значение логического типа которые означает истинное значение
     */
    static TrueValues = [
        'True',
        'true',
        '1',
        'on',
        'On',
        'истина',
        'Истина',
        'да',
        'Да'
    ];
    static Parse(text) {
        return BooleanHelper.TrueValues.indexOf(text) > -1;
    }
    static getBooleanValue(value, yes = 'Да', no = 'Нет') {
        return (value ? yes : no);
    }
}

class BrowserHelper {
    /**
     * return true if url is in absolute form
     * see for details: https://stackoverflow.com/a/19709846
     * @param url url
     */
    static isAbsoluteUrl(url) {
        return new RegExp('^((?:[a-z]+:)?//|mailto:)', 'i').test(url);
    }
    static open(url, openInNewTab = false) {
        window.open(url, openInNewTab ? '_blank' : '_self');
    }
    /**
     *
     * @param file
     * @param fileName
     */
    static downloadBlobFile(file, fileName) {
        const downloadUrl = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    ;
}

class CookiesHelper {
    /**
     * Возвращает куки с указанным name или undefined, если ничего не найдено
     * @param name Имя куки
     * @returns куки с указанным name или undefined, если ничего не найдено
     */
    static get(name) {
        const matches = document.cookie.match(new RegExp(
        // eslint-disable-next-line no-useless-escape
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    /**
     * Установка куки
     * @param name Имя
     * @param value Значение
     * @param encodeValue Нужно ли стандартное преобразование
     * @param options Дополнительные опции
     */
    static set(name, value, encodeValue = true, options = {}) {
        const currentOptions = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            ...options
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        };
        if (currentOptions['expires'] instanceof Date) {
            currentOptions['expires'] = currentOptions['expires'].toUTCString();
        }
        let updatedCookie = encodeURIComponent(name) + '=' + (encodeValue ? encodeURIComponent(value) : value);
        for (const optionKey in currentOptions) {
            updatedCookie += '; ' + optionKey;
            const optionValue = currentOptions[optionKey];
            if (optionValue !== true) {
                updatedCookie += '=' + optionValue;
            }
        }
        document.cookie = updatedCookie;
    }
    /**
     * Удаление куки
     * @param name Имя
     * @param encodeValue Нужно ли стандартное преобразование
     * @param options Дополнительные опции
     */
    static delete(name, encodeValue = true, options = {}) {
        CookiesHelper.set(name, '', encodeValue, {
            'max-age': -1,
            ...options
        });
    }
    /**
     * Удаление всех кук
     */
    static deleteAll() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
    }
}

class EnumHelper {
    /**
     *
     * @param $enum
     * @returns
     */
    static getValues($enum) {
        return Object.keys($enum).map((key) => $enum[key]);
    }
    static getNames($enum) {
        return Object.keys($enum).map((key) => key);
    }
}

class ObjectHelper {
    /**
     * Проверка значения на undefined или null
     * @param value Проверяемое значение
     * @returns Статус проверки
     */
    static isNullOrUndefined = (value) => {
        return value === undefined || value === null;
    };
    /**
     * Проверка объекта на то, что все его свойства имеют значения undefined
     * @param object Проверяемый объект
     * @returns Статус проверки
     */
    static isObjectValuesEmpty = (object) => {
        return !Object.values(object).some((value) => value !== undefined);
    };
    /**
     * Searches the supplied object, and then down it's prototype chain until it
     * finds the object where `prop` is its own property. In other words, finds
     * the object in which `prop` was actually defined on, skipping objects that
     * merely inherit `prop`. This is useful when using methods like
     * `Object.getOwnPropertyDescriptor()` which only work on "own" properties.
     *
     * @param scope   The scope on which to start checking for
     * @param prop    The name of the property we're searching for
     * @returns {*}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getPropertyDefinitionObject(scope, prop) {
        if (!scope)
            return null;
        return Object.prototype.hasOwnProperty.call(scope, prop)
            ? scope
            : this.getPropertyDefinitionObject(Object.getPrototypeOf(scope), prop);
    }
}

class FunctionHelper {
    /**
       * Bind all methods on `scope` to that `scope`.
       *
       * Normal fat arrow/lambda functions in TypeScript are simply member functions
       * that replace the value of `this`, with `_this` (a reference to `this` from
       * within the constructor's scope). They're not on the prototype and as such do not
       * support inheritance. So no calling `super.myMethod()` if it's been
       * declared with a `=>`.
       *
       * `FunctionUtil.bindAllMethods( this )` should be called from the base class' constructor.
       * It will bind each method as such that it will always execute using the class scope.
       *
       * Essentially, we should now write class methods without `=>`. When executed,
       * the scope will be preserved and they will importantly continue to support
       * inheritance. Fat arrow/lambda functions (`=>`) are still great when you
       * don't require inheritance, for example, when using anonymous function callbacks.
       *
       * @param scope     Usually, pass the value of `this` from your base class.
       */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    static bindAllMethods(scope) {
        for (const p in scope) {
            // Find the object in which prop was originally defined on
            const ownObject = ObjectHelper.getPropertyDefinitionObject(scope, p);
            // Now we can check if it is a getter/setter
            const descriptor = Object.getOwnPropertyDescriptor(ownObject, p);
            if (descriptor && (descriptor.get || descriptor.set))
                continue; // Don't bind if `scope[p]` is a getter/setter, we'd be attemping to bind the value returned by the getter
            // Only bind if scope[p] is a function that's not already a class member
            // the bound function will be added as a class member, referencing the function on the prototype
            if (!Object.prototype.hasOwnProperty.call(scope, p) && typeof scope[p] == 'function')
                scope[p] = scope[p].bind(scope);
        }
    }
}

class NumberHelper {
    // #region Integer
    /**
     * Проверка на установленный флаг
     * @param value Значение
     * @param flag Проверяемый флаг
     * @returns Статус установки флага
     */
    static IsFlagSet(value, flag) {
        return (value & flag) != 0;
    }
    /**
     * Установка флага
     * @param value Значение
     * @param flag Флаг
     * @returns Новое значение
     */
    static SetFlag(value, flags) {
        value |= flags;
        return value;
    }
    /**
     * Очистка флага
     * @param value Значение
     * @param flags Флаг
     * @returns Новое значение
     */
    static ClearFlag(value, flags) {
        value &= ~flags;
        return value;
    }
    /**
     * Преобразование в текст который можно сконвертировать в целый тип
     * @param text Текст
     * @returns Текст
     */
    static ParseableTextInt(text) {
        let numberText = '';
        let add_minus = false;
        const max = 11;
        for (let i = 0; i < text.length; i++) {
            const c = text[i];
            if (c == '-' && (i != text.length - 1) && add_minus == false) {
                numberText += c;
                add_minus = true;
                continue;
            }
            if (c >= '0' && c <= '9') {
                numberText += c;
            }
            if (numberText.length > max) {
                break;
            }
        }
        return numberText;
    }
    /**
     * Преобразование текста в целое число
     * @param text Текст
     * @param defaultValue Значение по умолчанию если преобразовать не удалось
     * @returns Значение
     */
    static ParseInt(text, defaultValue = 0) {
        text = NumberHelper.ParseableTextInt(text);
        const resultValue = Number.parseInt(text);
        if (Number.isNaN(resultValue)) {
            return defaultValue;
        }
        return resultValue;
    }
    // #endregion
    // #region Float
    /**
     * Преобразование в текст который можно сконвертировать в вещественный тип
     * @param text Текст
     * @returns Текст
     */
    static ParseableTextFloat(text) {
        let numberText = '';
        let add_minus = false;
        let add_dot = false;
        for (let i = 0; i < text.length; i++) {
            const c = text[i];
            if (c == '-' && (i != text.length - 1) && add_minus == false) {
                numberText += c;
                add_minus = true;
                continue;
            }
            if ((c == ',' || c == '.') && (i != text.length - 1) && add_dot == false) {
                numberText += '.';
                add_dot = true;
                continue;
            }
            if (c >= '0' && c <= '9') {
                numberText += c;
            }
        }
        return numberText;
    }
    /**
     * Преобразование текста в вещественное число
     * @param text Текст
     * @param defaultValue Значение по умолчанию если преобразовать не удалось
     * @returns Значение
     */
    static ParseFloat(text, defaultValue = 0) {
        text = NumberHelper.ParseableTextFloat(text);
        const resultValue = Number.parseFloat(text);
        if (Number.isNaN(resultValue)) {
            return defaultValue;
        }
        return resultValue;
    }
}

class PathHelper {
    /**
     *
     * @param fileName
     * @returns
     */
    static splitNameAndExtension(fileName) {
        const index = fileName.lastIndexOf('.');
        if (index !== -1) {
            return [fileName.substring(0, index), fileName.substring(index)];
        }
        return [fileName, ''];
    }
    ;
}

class RandomHelper {
    static getMinMax = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    static getMax = (max) => {
        return Math.floor(Math.random() * max);
    };
}

class StringHelper {
    /**
     * see for details: https://stackoverflow.com/a/2140644
     * (warning: function may not work with Unicode special characters)
     */
    static EqualIgnoreCase(first, second) {
        return first.toUpperCase() === second.toUpperCase();
    }
    /**
     *
     * @param value
     * @returns
     */
    static isNullOrEmpty(value) {
        return value === undefined || value === null || value.trim() === '';
    }
    /**
     *
     * @param value
     * @returns
     */
    static capitalizeFirstLetter(value) {
        return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
    }
    /**
     *
     * @param value
     * @returns
     */
    static toUpperCaseAllFirstLetters(value) {
        return value.split(' ').map((word) => word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ');
    }
}

const actions = {
    get: 'Получить',
    getting: 'Получение...',
    gettingSucceed: 'Получение данных прошло успешно',
    gettingFailed: 'При получение данных произошла ошибка',
    add: 'Добавить',
    adding: 'Добавление...',
    addingSucceed: 'Добавление прошло успешно',
    addingFailed: 'При добавление произошла ошибка',
    edit: 'Редактировать',
    save: 'Сохранить',
    saving: 'Сохранение...',
    savingSucceed: 'Сохранение прошло успешно',
    savingFailed: 'При сохранении произошла ошибка',
    duplicate: 'Дублировать',
    delete: 'Удалить',
    deleting: 'Удаление...',
    deletingSucceed: 'Удаление прошло успешно',
    deletingFailed: 'При удаление произошла ошибка',
    deleteObject: 'Удалить объект?',
    cancel: 'Отменить',
    clear: 'Отчистить',
    confirm: 'Подтверждаю'
};

const common = {
    name: 'Наименование',
    displayName: 'Отображаемое наименование'
};

const filters = {
    equals: 'Равно',
    equalsAbbr: '=',
    notEqual: 'Не равно',
    notEqualAbbr: '!=',
    lessThan: 'Меньше',
    lessThanAbbr: '<',
    lessThanOrEqual: 'Меньше или равно',
    lessThanOrEqualAbbr: '<=',
    greaterThan: 'Больше',
    greaterThanAbbr: '>',
    greaterThanOrEqual: 'Больше или равно',
    greaterThanOrEqualAbbr: '>=',
    between: 'Между',
    betweenAbbr: '<>',
    contains: 'Содержит',
    startsWith: 'Начинается с',
    endsWith: 'Заканчивается на',
    notEmpty: 'Не пустая',
    includeAny: 'Любой из элементов',
    includeAll: 'Все из элементов',
    includeEquals: 'Только эти элементы',
    includeNone: 'Ни один из элементов'
};

const validation = {
    required: 'Поле обязательно для ввода',
    maxLength: (length) => `Длина поля не может превышать ${length} символов`
};

const ruLocale = {
    // Common
    actions,
    common,
    filters,
    validation
};

const localizationCore = ruLocale;

/**
 * Определение интерфейса для представления ответа/результата выполнения операции
 */
/**
 * Проверка объекта на поддержку интерфейса IResult
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkOfResult(value) {
    if (value) {
        return ('succeeded' in value) && ('code' in value);
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу IResult
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfResult(value) {
    if (checkOfResult(value)) {
        return value;
    }
    else {
        // eslint-disable-next-line consistent-return
        return undefined;
    }
}

/**
 * Базовый класс для сервисов Api
 */
class ApiService {
    api;
    constructor() {
        const api = axios.create({
            baseURL: process.env['REACT_APP_API_URI']
        });
        api.interceptors.request.use(this.handleRequest, this.handleRequestError);
        api.interceptors.response.use(this.handleResponse, this.handleResponseError);
        this.api = api;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleRequest(config) {
        config.timeout = 10 * 60 * 1000;
        config.cancelToken = axios.CancelToken.source().token;
        return config;
    }
    handleRequestError(error) {
        console.error(`[request error] [${JSON.stringify(error)}]`);
        return Promise.reject(error);
    }
    handleResponse(response) {
        return response;
    }
    handleResponseError(error) {
        // Запрос был сделан, и сервер ответил кодом состояния, который выходит за пределы 2xx
        if (error.response) {
            // Все ошибки приводим к типу IResult для унификации обработки и реагирования
            const result = instanceOfResult(error.response.data);
            if (result) {
                console.log(error.response.data);
                return Promise.reject(result);
            }
            else {
                const resultError = {
                    succeeded: false,
                    code: Number(error.response.status ?? 500),
                    message: error.message
                };
                return Promise.reject(resultError);
            }
        }
        else {
            // Запрос был сделан, но ответ не получен - `error.request`- это экземпляр XMLHttpRequest в браузере
            if (error.request) {
                // Проверка на отдельные коды ошибок
                if (error.code === 'ERR_NETWORK') {
                    const result = { succeeded: false, code: 500, message: error.message };
                    return Promise.reject(result);
                }
                console.log(error);
                console.log('Error is not result!!!');
                return Promise.reject(error);
            }
            else {
                // Произошло что-то при настройке запроса, вызвавшее ошибку
                console.log(error);
                console.log('Error is not result!!!');
                return Promise.reject(error);
            }
        }
    }
    ;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any    
    get(path, config) {
        return this.api.get(path, config);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any  
    post(path, payload) {
        return this.api.post(path, payload);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any  
    put(path, payload) {
        return this.api.put(path, payload);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any  
    delete(path, config) {
        return this.api.delete(path, config);
    }
    getConfigAcceptJson() {
        const config = {
            headers: {
                'Accept': 'application/json'
            }
        };
        return config;
    }
}

// This is a slightly modified version of this list:
//   https://www.color-hex.com/color-names.html
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ColorNames = {
    'alice blue': [240, 248, 255],
    'antique white': [250, 235, 215],
    'antique white 1': [255, 239, 219],
    'antique white 2': [238, 223, 204],
    'antique white 3': [205, 192, 176],
    'antique white 4': [139, 131, 120],
    'aquamarine': [127, 255, 212],
    'aquamarine 2': [118, 238, 198],
    'aquamarine 4': [69, 139, 116],
    'azure': [240, 255, 255],
    'azure 2': [224, 238, 238],
    'azure 3': [193, 205, 205],
    'azure 4': [131, 139, 139],
    'beige': [245, 245, 220],
    'bisque': [255, 228, 196],
    'bisque 2': [238, 213, 183],
    'bisque 3': [205, 183, 158],
    'bisque 4': [139, 125, 107],
    'black': [0, 0, 0],
    'blanched almond': [255, 235, 205],
    'blue': [0, 0, 255],
    'blue 2': [0, 0, 238],
    'blue 4': [0, 0, 139],
    'blue violet': [138, 43, 226],
    'brown': [165, 42, 42],
    'brown 1': [255, 64, 64],
    'brown 2': [238, 59, 59],
    'brown 3': [205, 51, 51],
    'brown 4': [139, 35, 35],
    'burlywood': [222, 184, 135],
    'burlywood 1': [255, 211, 155],
    'burlywood 2': [238, 197, 145],
    'burlywood 3': [205, 170, 125],
    'burlywood 4': [139, 115, 85],
    'cadet blue': [95, 158, 160],
    'cadet blue 1': [152, 245, 255],
    'cadet blue 2': [142, 229, 238],
    'cadet blue 3': [122, 197, 205],
    'cadet blue 4': [83, 134, 139],
    'chartreuse': [127, 255, 0],
    'chartreuse 2': [118, 238, 0],
    'chartreuse 3': [102, 205, 0],
    'chartreuse 4': [69, 139, 0],
    'chocolate': [210, 105, 30],
    'chocolate 1': [255, 127, 36],
    'chocolate 2': [238, 118, 33],
    'chocolate 3': [205, 102, 29],
    'coral': [255, 127, 80],
    'coral 1': [255, 114, 86],
    'coral 2': [238, 106, 80],
    'coral 3': [205, 91, 69],
    'coral 4': [139, 62, 47],
    'cornflower blue': [100, 149, 237],
    'corn silk': [255, 248, 220],
    'corn silk 2': [238, 232, 205],
    'corn silk 3': [205, 200, 177],
    'corn silk 4': [139, 136, 120],
    'cyan': [0, 255, 255],
    'cyan 2': [0, 238, 238],
    'cyan 3': [0, 205, 205],
    'cyan 4': [0, 139, 139],
    'dark golden rod': [184, 134, 11],
    'dark golden rod 1': [255, 185, 15],
    'dark golden rod 2': [238, 173, 14],
    'dark golden rod 3': [205, 149, 12],
    'dark golden rod 4': [139, 101, 8],
    'dark green': [0, 100, 0],
    'dark khaki': [189, 183, 107],
    'dark olive green': [85, 107, 47],
    'dark olive green 1': [202, 255, 112],
    'dark olive green 2': [188, 238, 104],
    'dark olive green 3': [162, 205, 90],
    'dark olive green 4': [110, 139, 61],
    'dark orange': [255, 140, 0],
    'dark orange 1': [255, 127, 0],
    'dark orange 2': [238, 118, 0],
    'dark orange 3': [205, 102, 0],
    'dark orange 4': [139, 69, 0],
    'dark orchid': [153, 50, 204],
    'dark orchid 1': [191, 62, 255],
    'dark orchid 2': [178, 58, 238],
    'dark orchid 3': [154, 50, 205],
    'dark orchid 4': [104, 34, 139],
    'dark salmon': [233, 150, 122],
    'dark sea green': [143, 188, 143],
    'dark sea green 1': [193, 255, 193],
    'dark sea green 2': [180, 238, 180],
    'dark sea green 3': [155, 205, 155],
    'dark sea green 4': [105, 139, 105],
    'dark slate blue': [72, 61, 139],
    'dark slate gray': [47, 79, 79],
    'dark slate gray 1': [151, 255, 255],
    'dark slate gray 2': [141, 238, 238],
    'dark slate gray 3': [121, 205, 205],
    'dark slate gray 4': [82, 139, 139],
    'dark turquoise': [0, 206, 209],
    'dark violet': [148, 0, 211],
    'deep pink': [255, 20, 147],
    'deep pink 2': [238, 18, 137],
    'deep pink 3': [205, 16, 118],
    'deep pink 4': [139, 10, 80],
    'deep sky blue': [0, 191, 255],
    'deep sky blue 2': [0, 178, 238],
    'deep sky blue 3': [0, 154, 205],
    'deep sky blue 4': [0, 104, 139],
    'dim gray': [105, 105, 105],
    'dodger blue': [30, 144, 255],
    'dodger blue 2': [28, 134, 238],
    'dodger blue 3': [24, 116, 205],
    'dodger blue 4': [16, 78, 139],
    'fire brick': [178, 34, 34],
    'fire brick 1': [255, 48, 48],
    'fire brick 2': [238, 44, 44],
    'fire brick 3': [205, 38, 38],
    'fire brick 4': [139, 26, 26],
    'floral white': [255, 250, 240],
    'forest green': [34, 139, 34],
    'gainsboro': [220, 220, 220],
    'ghost white': [248, 248, 255],
    'gold': [255, 215, 0],
    'gold 2': [238, 201, 0],
    'gold 3': [205, 173, 0],
    'gold 4': [139, 117, 0],
    'golden rod': [218, 165, 32],
    'golden rod 1': [255, 193, 37],
    'golden rod 2': [238, 180, 34],
    'golden rod 3': [205, 155, 29],
    'golden rod 4': [139, 105, 20],
    'gray': [190, 190, 190],
    'gray 1': [3, 3, 3],
    'gray 2': [5, 5, 5],
    'gray 3': [8, 8, 8],
    'gray 4': [10, 10, 10],
    'gray 5': [13, 13, 13],
    'gray 6': [15, 15, 15],
    'gray 7': [18, 18, 18],
    'gray 8': [20, 20, 20],
    'gray 9': [23, 23, 23],
    'gray 10': [26, 26, 26],
    'gray 11': [28, 28, 28],
    'gray 12': [31, 31, 31],
    'gray 13': [33, 33, 33],
    'gray 14': [36, 36, 36],
    'gray 15': [38, 38, 38],
    'gray 16': [41, 41, 41],
    'gray 17': [43, 43, 43],
    'gray 18': [46, 46, 46],
    'gray 19': [48, 48, 48],
    'gray 20': [51, 51, 51],
    'gray 21': [54, 54, 54],
    'gray 22': [56, 56, 56],
    'gray 23': [59, 59, 59],
    'gray 24': [61, 61, 61],
    'gray 25': [64, 64, 64],
    'gray 26': [66, 66, 66],
    'gray 27': [69, 69, 69],
    'gray 28': [71, 71, 71],
    'gray 29': [74, 74, 74],
    'gray 30': [77, 77, 77],
    'gray 31': [79, 79, 79],
    'gray 32': [82, 82, 82],
    'gray 33': [84, 84, 84],
    'gray 34': [87, 87, 87],
    'gray 35': [89, 89, 89],
    'gray 36': [92, 92, 92],
    'gray 37': [94, 94, 94],
    'gray 38': [97, 97, 97],
    'gray 39': [99, 99, 99],
    'gray 40': [102, 102, 102],
    'gray 41': [105, 105, 105],
    'gray 42': [107, 107, 107],
    'gray 43': [110, 110, 110],
    'gray 44': [112, 112, 112],
    'gray 45': [115, 115, 115],
    'gray 46': [117, 117, 117],
    'gray 47': [120, 120, 120],
    'gray 48': [122, 122, 122],
    'gray 49': [125, 125, 125],
    'gray 50': [127, 127, 127],
    'gray 51': [130, 130, 130],
    'gray 52': [133, 133, 133],
    'gray 53': [135, 135, 135],
    'gray 54': [138, 138, 138],
    'gray 55': [140, 140, 140],
    'gray 56': [143, 143, 143],
    'gray 57': [145, 145, 145],
    'gray 58': [148, 148, 148],
    'gray 59': [150, 150, 150],
    'gray 60': [153, 153, 153],
    'gray 61': [156, 156, 156],
    'gray 62': [158, 158, 158],
    'gray 63': [161, 161, 161],
    'gray 64': [163, 163, 163],
    'gray 65': [166, 166, 166],
    'gray 66': [168, 168, 168],
    'gray 67': [171, 171, 171],
    'gray 68': [173, 173, 173],
    'gray 69': [176, 176, 176],
    'gray 70': [179, 179, 179],
    'gray 71': [181, 181, 181],
    'gray 72': [184, 184, 184],
    'gray 73': [186, 186, 186],
    'gray 74': [189, 189, 189],
    'gray 75': [191, 191, 191],
    'gray 76': [194, 194, 194],
    'gray 77': [196, 196, 196],
    'gray 78': [199, 199, 199],
    'gray 79': [201, 201, 201],
    'gray 80': [204, 204, 204],
    'gray 81': [207, 207, 207],
    'gray 82': [209, 209, 209],
    'gray 83': [212, 212, 212],
    'gray 84': [214, 214, 214],
    'gray 85': [217, 217, 217],
    'gray 86': [219, 219, 219],
    'gray 87': [222, 222, 222],
    'gray 88': [224, 224, 224],
    'gray 89': [227, 227, 227],
    'gray 90': [229, 229, 229],
    'gray 91': [232, 232, 232],
    'gray 92': [235, 235, 235],
    'gray 93': [237, 237, 237],
    'gray 94': [240, 240, 240],
    'gray 95': [242, 242, 242],
    'gray 97': [247, 247, 247],
    'gray 98': [250, 250, 250],
    'gray 99': [252, 252, 252],
    'green': [0, 255, 0],
    'green 2': [0, 238, 0],
    'green 3': [0, 205, 0],
    'green 4': [0, 139, 0],
    'green yellow': [173, 255, 47],
    'honeydew': [240, 255, 240],
    'honeydew 2': [224, 238, 224],
    'honeydew 3': [193, 205, 193],
    'honeydew 4': [131, 139, 131],
    'hot pink': [255, 105, 180],
    'hot pink 1': [255, 110, 180],
    'hot pink 2': [238, 106, 167],
    'hot pink 3': [205, 96, 144],
    'hot pink 4': [139, 58, 98],
    'indian red': [205, 92, 92],
    'indian red 1': [255, 106, 106],
    'indian red 2': [238, 99, 99],
    'indian red 3': [205, 85, 85],
    'indian red 4': [139, 58, 58],
    'ivory': [255, 255, 240],
    'ivory 2': [238, 238, 224],
    'ivory 3': [205, 205, 193],
    'ivory 4': [139, 139, 131],
    'khaki': [240, 230, 140],
    'khaki 1': [255, 246, 143],
    'khaki 2': [238, 230, 133],
    'khaki 3': [205, 198, 115],
    'khaki 4': [139, 134, 78],
    'lavender': [230, 230, 250],
    'lavender blush': [255, 240, 245],
    'lavender blush 2': [238, 224, 229],
    'lavender blush 3': [205, 193, 197],
    'lavender blush 4': [139, 131, 134],
    'lawn green': [124, 252, 0],
    'lemon chiffon': [255, 250, 205],
    'lemon chiffon 2': [238, 233, 191],
    'lemon chiffon 3': [205, 201, 165],
    'lemon chiffon 4': [139, 137, 112],
    'light': [238, 221, 130],
    'light blue': [173, 216, 230],
    'light blue 1': [191, 239, 255],
    'light blue 2': [178, 223, 238],
    'light blue 3': [154, 192, 205],
    'light blue 4': [104, 131, 139],
    'light coral': [240, 128, 128],
    'light cyan': [224, 255, 255],
    'light cyan 2': [209, 238, 238],
    'light cyan 3': [180, 205, 205],
    'light cyan 4': [122, 139, 139],
    'light golden rod': [255, 236, 139],
    'light golden rod 2': [238, 220, 130],
    'light golden rod 3': [205, 190, 112],
    'light golden rod 4': [139, 129, 76],
    'light golden rod yellow': [250, 250, 210],
    'light gray': [211, 211, 211],
    'light pink': [255, 182, 193],
    'light pink 1': [255, 174, 185],
    'light pink 2': [238, 162, 173],
    'light pink 3': [205, 140, 149],
    'light pink 4': [139, 95, 101],
    'light salmon': [255, 160, 122],
    'light salmon 2': [238, 149, 114],
    'light salmon 3': [205, 129, 98],
    'light salmon 4': [139, 87, 66],
    'light sea green': [32, 178, 170],
    'light sky blue': [135, 206, 250],
    'light sky blue 1': [176, 226, 255],
    'light sky blue 2': [164, 211, 238],
    'light sky blue 3': [141, 182, 205],
    'light sky blue 4': [96, 123, 139],
    'light slate blue': [132, 112, 255],
    'light slate gray': [119, 136, 153],
    'light steel blue': [176, 196, 222],
    'light steel blue 1': [202, 225, 255],
    'light steel blue 2': [188, 210, 238],
    'light steel blue 3': [162, 181, 205],
    'light steel blue 4': [110, 123, 139],
    'light yellow': [255, 255, 224],
    'light yellow 2': [238, 238, 209],
    'light yellow 3': [205, 205, 180],
    'light yellow 4': [139, 139, 122],
    'lime green': [50, 205, 50],
    'linen': [250, 240, 230],
    'magenta': [255, 0, 255],
    'magenta 2': [238, 0, 238],
    'magenta 3': [205, 0, 205],
    'magenta 4': [139, 0, 139],
    'maroon': [176, 48, 96],
    'maroon 1': [255, 52, 179],
    'maroon 2': [238, 48, 167],
    'maroon 3': [205, 41, 144],
    'maroon 4': [139, 28, 98],
    'medium': [102, 205, 170],
    'medium aquamarine': [102, 205, 170],
    'medium blue': [0, 0, 205],
    'medium orchid': [186, 85, 211],
    'medium orchid 1': [224, 102, 255],
    'medium orchid 2': [209, 95, 238],
    'medium orchid 3': [180, 82, 205],
    'medium orchid 4': [122, 55, 139],
    'medium purple': [147, 112, 219],
    'medium purple 1': [171, 130, 255],
    'medium purple 2': [159, 121, 238],
    'medium purple 3': [137, 104, 205],
    'medium purple 4': [93, 71, 139],
    'medium sea green': [60, 179, 113],
    'medium slate blue': [123, 104, 238],
    'medium spring green': [0, 250, 154],
    'medium turquoise': [72, 209, 204],
    'medium violet red': [199, 21, 133],
    'midnight blue': [25, 25, 112],
    'mint cream': [245, 255, 250],
    'misty rose': [255, 228, 225],
    'misty rose 2': [238, 213, 210],
    'misty rose 3': [205, 183, 181],
    'misty rose 4': [139, 125, 123],
    'moccasin': [255, 228, 181],
    'navajo white': [255, 222, 173],
    'navajo white 2': [238, 207, 161],
    'navajo white 3': [205, 179, 139],
    'navajo white 4': [139, 121, 94],
    'navy blue': [0, 0, 128],
    'old lace': [253, 245, 230],
    'olive drab': [107, 142, 35],
    'olive drab 1': [192, 255, 62],
    'olive drab 2': [179, 238, 58],
    'olive drab 4': [105, 139, 34],
    'orange': [255, 165, 0],
    'orange 2': [238, 154, 0],
    'orange 3': [205, 133, 0],
    'orange 4': [139, 90, 0],
    'orange red': [255, 69, 0],
    'orange red 2': [238, 64, 0],
    'orange red 3': [205, 55, 0],
    'orange red 4': [139, 37, 0],
    'orchid': [218, 112, 214],
    'orchid 1': [255, 131, 250],
    'orchid 2': [238, 122, 233],
    'orchid 3': [205, 105, 201],
    'orchid 4': [139, 71, 137],
    'pale': [219, 112, 147],
    'pale golden rod': [238, 232, 170],
    'pale green': [152, 251, 152],
    'pale green 1': [154, 255, 154],
    'pale green 2': [144, 238, 144],
    'pale green 3': [124, 205, 124],
    'pale green 4': [84, 139, 84],
    'pale turquoise': [175, 238, 238],
    'pale turquoise 1': [187, 255, 255],
    'pale turquoise 2': [174, 238, 238],
    'pale turquoise 3': [150, 205, 205],
    'pale turquoise 4': [102, 139, 139],
    'pale violet red': [219, 112, 147],
    'pale violet red 1': [255, 130, 171],
    'pale violet red 2': [238, 121, 159],
    'pale violet red 3': [205, 104, 137],
    'pale violet red 4': [139, 71, 93],
    'papaya whip': [255, 239, 213],
    'peach puff': [255, 218, 185],
    'peach puff 2': [238, 203, 173],
    'peach puff 3': [205, 175, 149],
    'peach puff 4': [139, 119, 101],
    'pink': [255, 192, 203],
    'pink 1': [255, 181, 197],
    'pink 2': [238, 169, 184],
    'pink 3': [205, 145, 158],
    'pink 4': [139, 99, 108],
    'plum': [221, 160, 221],
    'plum 1': [255, 187, 255],
    'plum 2': [238, 174, 238],
    'plum 3': [205, 150, 205],
    'plum 4': [139, 102, 139],
    'powder blue': [176, 224, 230],
    'purple': [160, 32, 240],
    'purple 1': [155, 48, 255],
    'purple 2': [145, 44, 238],
    'purple 3': [125, 38, 205],
    'purple 4': [85, 26, 139],
    'rebecca purple': [102, 51, 153],
    'red': [255, 0, 0],
    'red 2': [238, 0, 0],
    'red 3': [205, 0, 0],
    'red 4': [139, 0, 0],
    'rosy brown': [188, 143, 143],
    'rosy brown 1': [255, 193, 193],
    'rosy brown 2': [238, 180, 180],
    'rosy brown 3': [205, 155, 155],
    'rosy brown 4': [139, 105, 105],
    'royal blue': [65, 105, 225],
    'royal blue 1': [72, 118, 255],
    'royal blue 2': [67, 110, 238],
    'royal blue 3': [58, 95, 205],
    'royal blue 4': [39, 64, 139],
    'saddle brown': [139, 69, 19],
    'salmon': [250, 128, 114],
    'salmon 1': [255, 140, 105],
    'salmon 2': [238, 130, 98],
    'salmon 3': [205, 112, 84],
    'salmon 4': [139, 76, 57],
    'sandy brown': [244, 164, 96],
    'sea green': [84, 255, 159],
    'sea green 2': [78, 238, 148],
    'sea green 3': [67, 205, 128],
    'sea green 4': [46, 139, 87],
    'seashell': [255, 245, 238],
    'seashell 2': [238, 229, 222],
    'seashell 3': [205, 197, 191],
    'seashell 4': [139, 134, 130],
    'sienna': [160, 82, 45],
    'sienna 1': [255, 130, 71],
    'sienna 2': [238, 121, 66],
    'sienna 3': [205, 104, 57],
    'sienna 4': [139, 71, 38],
    'sky blue': [135, 206, 235],
    'sky blue 1': [135, 206, 255],
    'sky blue 2': [126, 192, 238],
    'sky blue 3': [108, 166, 205],
    'sky blue 4': [74, 112, 139],
    'slate blue': [106, 90, 205],
    'slate blue 1': [131, 111, 255],
    'slate blue 2': [122, 103, 238],
    'slate blue 3': [105, 89, 205],
    'slate blue 4': [71, 60, 139],
    'slate gray': [112, 128, 144],
    'slate gray 1': [198, 226, 255],
    'slate gray 2': [185, 211, 238],
    'slate gray 3': [159, 182, 205],
    'slate gray 4': [108, 123, 139],
    'snow': [255, 250, 250],
    'snow 2': [238, 233, 233],
    'snow 3': [205, 201, 201],
    'snow 4': [139, 137, 137],
    'spring green': [0, 255, 127],
    'spring green 2': [0, 238, 118],
    'spring green 3': [0, 205, 102],
    'spring green 4': [0, 139, 69],
    'steel blue': [70, 130, 180],
    'steel blue 1': [99, 184, 255],
    'steel blue 2': [92, 172, 238],
    'steel blue 3': [79, 148, 205],
    'steel blue 4': [54, 100, 139],
    'tan': [210, 180, 140],
    'tan 1': [255, 165, 79],
    'tan 2': [238, 154, 73],
    'tan 3': [205, 133, 63],
    'tan 4': [139, 90, 43],
    'thistle': [216, 191, 216],
    'thistle 1': [255, 225, 255],
    'thistle 2': [238, 210, 238],
    'thistle 3': [205, 181, 205],
    'thistle 4': [139, 123, 139],
    'tomato': [255, 99, 71],
    'tomato 2': [238, 92, 66],
    'tomato 3': [205, 79, 57],
    'tomato 4': [139, 54, 38],
    'transparent': [0, 0, 0, 0],
    'turquoise': [64, 224, 208],
    'turquoise 1': [0, 245, 255],
    'turquoise 2': [0, 229, 238],
    'turquoise 3': [0, 197, 205],
    'turquoise 4': [0, 134, 139],
    'violet': [238, 130, 238],
    'violet red': [208, 32, 144],
    'violet red 1': [255, 62, 150],
    'violet red 2': [238, 58, 140],
    'violet red 3': [205, 50, 120],
    'violet red 4': [139, 34, 82],
    'wheat': [245, 222, 179],
    'wheat 1': [255, 231, 186],
    'wheat 2': [238, 216, 174],
    'wheat 3': [205, 186, 150],
    'wheat 4': [139, 126, 102],
    'white': [255, 255, 255],
    'white smoke': [245, 245, 245],
    'yellow': [255, 255, 0],
    'yellow 2': [238, 238, 0],
    'yellow 3': [205, 205, 0],
    'yellow 4': [139, 139, 0],
    'yellow green': [154, 205, 50]
};

/**
 * Базовый класс команды
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class BaseCommand {
    //
    // ОСНОВНЫЕ ДАННЫЕ
    //
    /**
     * Имя команды
     */
    name;
    /**
     * Параметр команды
     */
    parameter;
    //
    // ПАРАМЕТРЫ МАРШРУТИЗАЦИИ
    //
    /**
     * Маршрут команды
     */
    route;
    //
    // СВЯЗЬ С ВИЗУАЛЬНОЙ ЧАСТЬЮ
    //
    /**
     * Надпись
     */
    label;
    /**
     * Иконка
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon;
    /**
     * Порядок при сортировке команд
     */
    order;
    /**
     * Группа к которой относиться команда
     */
    group;
    constructor(name) {
        this.name = name;
        this.label = '';
    }
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    execute() {
        // TODO document why this method 'execute' is empty
    }
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecute() {
        return true;
    }
    /**
     * Статус выбора
     */
    isSelected() {
        return false;
    }
}

/**
 * Сервис для работы с командами
 * @description Все команды которые есть в приложении должны быть добавлены в данный сервис
 */
class CommandServiceClass {
    static _CommandService;
    static get Instance() {
        return (this._CommandService || (this._CommandService = new this()));
    }
    commands;
    constructor() {
        this.commands = [];
        this.getCommands = this.getCommands.bind(this);
        this.getCommandsByGroup = this.getCommandsByGroup.bind(this);
        this.getCommandsByGroupAsName = this.getCommandsByGroupAsName.bind(this);
        this.getCommandsByName = this.getCommandsByName.bind(this);
    }
    addCommands(commands) {
        commands.forEach(element => {
            this.commands.push(element);
        });
    }
    getCommands() {
        return this.commands;
    }
    getCommandsByGroup(group) {
        return this.commands.filter((x) => x.group === group);
    }
    getCommandsByGroupAsName(group) {
        return this.commands.filter((x) => x.group === group).map(x => x.name);
    }
    getCommandsByName(names) {
        const result = [];
        if (names) {
            names.forEach((x) => {
                const command = this.commands.find(c => c.name === x);
                if (command) {
                    result.push(command);
                }
            });
        }
        return result;
    }
}
/**
 * Глобальный доступ к сервису для работы с командами
 */
const CommandService = CommandServiceClass.Instance;

/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class DelimiterCommand {
    //
    // ОСНОВНЫЕ ДАННЫЕ
    //
    /**
     * Имя команды
     */
    name;
    /**
     * Параметр команды
     */
    parameter;
    //
    // ПАРАМЕТРЫ МАРШРУТИЗАЦИИ
    //
    /**
     * Маршрут команды
     */
    route;
    //
    // СВЯЗЬ С ВИЗУАЛЬНОЙ ЧАСТЬЮ
    //
    /**
     * Надпись
     */
    label;
    /**
     * Иконка
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon;
    /**
     * Порядок при сортировке команд
     */
    order;
    /**
     * Группа к которой относиться команда
     */
    group;
    constructor(name) {
        this.name = name;
        this.label = '';
        CommandService.addCommands([this]);
    }
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    execute() {
        // TODO document why this method 'execute' is empty
    }
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecute() {
        return true;
    }
    /**
     * Статус выбора
     */
    isSelected() {
        return false;
    }
}
/**
 * Глобальный доступ к команде разделения по умолчанию
 */
const DelimiterCommandDefault = new DelimiterCommand('delimiter');

/**
 * Класс команды для генерирования пользовательских событий
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class EventCommand extends BaseCommand {
    constructor(name) {
        super(name);
    }
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    execute() {
        const event = new Event('openModal');
        window.dispatchEvent(event);
    }
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecute() {
        return true;
    }
    /**
     * Статус выбора
     */
    isSelected() {
        if (window.location.pathname === this.route?.path) {
            return true;
        }
        return false;
    }
}

/**
 * Класс команды для простой навигации
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class NavigationCommand extends BaseCommand {
    constructor(name, route) {
        super(name);
        this.route = route;
    }
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    execute() {
        // TODO document why this method 'execute' is empty
    }
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecute() {
        return true;
    }
    /**
     * Статус выбора
     */
    isSelected() {
        if (window.location.pathname === this.route?.path) {
            return true;
        }
        return false;
    }
}

/**
 * Перечисление для типа функции для фильтрации данных
 */
const FilterFunctionEnum = {
    /**
     * Равно аргументу
     */
    Equals: {
        id: 0,
        name: 'equals',
        abbr: localizationCore.filters.equalsAbbr,
        desc: localizationCore.filters.equals
    },
    /**
     * Не равно аргументу
     */
    NotEqual: {
        id: 1,
        name: 'notEquals',
        abbr: localizationCore.filters.notEqualAbbr,
        desc: localizationCore.filters.notEqual
    },
    /**
     * Меньше аргумента
     */
    LessThan: {
        id: 2,
        name: 'lessThan',
        abbr: localizationCore.filters.lessThanAbbr,
        desc: localizationCore.filters.lessThan
    },
    /**
     * Меньше или равно аргумента
     */
    LessThanOrEqual: {
        id: 3,
        name: 'lessThanOrEqualTo',
        abbr: localizationCore.filters.lessThanOrEqualAbbr,
        desc: localizationCore.filters.lessThanOrEqual
    },
    /**
     * Больше аргумента
     */
    GreaterThan: {
        id: 4,
        name: 'greaterThan',
        abbr: localizationCore.filters.greaterThanAbbr,
        desc: localizationCore.filters.greaterThan
    },
    /**
     * Больше или равно аргумента
     */
    GreaterThanOrEqual: {
        id: 5,
        name: 'greaterThanOrEqualTo',
        abbr: localizationCore.filters.greaterThanOrEqualAbbr,
        desc: localizationCore.filters.greaterThanOrEqual
    },
    /**
     * Между первым аргументом (меньшим) и вторым аргументом (большим)
     */
    Between: {
        id: 6,
        name: 'between',
        abbr: localizationCore.filters.betweenAbbr,
        desc: localizationCore.filters.between
    },
    /**
    * Аргумент (строка) может находиться в любом месте c учетом регистра
    */
    Contains: {
        id: 7,
        name: 'contains',
        abbr: localizationCore.filters.contains,
        desc: localizationCore.filters.contains
    },
    /**
    * Аргумент(строка) может находиться в любом месте c учетом регистра
    */
    StartsWith: {
        id: 8,
        name: 'startsWith',
        abbr: localizationCore.filters.startsWith,
        desc: localizationCore.filters.startsWith
    },
    /**
     * Аргумент(строка) должна находится в конце c учетом регистра
     */
    EndsWith: {
        id: 9,
        name: 'endsWith',
        abbr: localizationCore.filters.endsWith,
        desc: localizationCore.filters.endsWith
    },
    /**
     * Не равно пустой строке. Аргумент пустая строка
     */
    NotEmpty: {
        id: 10,
        name: 'notEmpty',
        abbr: localizationCore.filters.notEmpty,
        desc: localizationCore.filters.notEmpty
    },
    /**
     * Любой из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAny: {
        id: 11,
        name: 'includeAny',
        abbr: localizationCore.filters.includeAny,
        desc: localizationCore.filters.includeAny
    },
    /**
     * Все из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAll: {
        id: 12,
        name: 'includeAll',
        abbr: localizationCore.filters.includeAll,
        desc: localizationCore.filters.includeAll
    },
    /**
     * Проверяемые элементы списка должен быть равны массиву аргумента
     */
    IncludeEquals: {
        id: 13,
        name: 'includeEquals',
        abbr: localizationCore.filters.includeEquals,
        desc: localizationCore.filters.includeEquals
    },
    /**
     * Ни один из проверяемых элементов списка не должен находится в массиве аргумента
     */
    IncludeNone: {
        id: 14,
        name: 'includeNone',
        abbr: localizationCore.filters.includeNone,
        desc: localizationCore.filters.includeNone
    }
};

/**
 * Группа функций фильтрации для числовых типов
 */
const GroupFilterFunctionsNumber = [
    FilterFunctionEnum.Equals,
    FilterFunctionEnum.NotEqual,
    FilterFunctionEnum.LessThan,
    FilterFunctionEnum.LessThanOrEqual,
    FilterFunctionEnum.GreaterThan,
    FilterFunctionEnum.GreaterThanOrEqual,
    FilterFunctionEnum.Between
];
/**
 * Группа функций фильтрации для строк
 */
const GroupFilterFunctionsString = [
    FilterFunctionEnum.Equals,
    FilterFunctionEnum.Contains,
    FilterFunctionEnum.StartsWith,
    FilterFunctionEnum.EndsWith,
    FilterFunctionEnum.NotEqual,
    FilterFunctionEnum.NotEmpty
];
/**
 * Группа функций фильтрации для перечисления
 */
const GroupFilterFunctionsEnum = [
    FilterFunctionEnum.Equals,
    FilterFunctionEnum.NotEqual
];
/**
 * Группа функций фильтрации для массива
 */
const GroupFilterFunctionsArray = [
    FilterFunctionEnum.IncludeAll,
    FilterFunctionEnum.IncludeAny,
    FilterFunctionEnum.IncludeEquals,
    FilterFunctionEnum.IncludeNone
];

class FilterFunctionHelper {
    static getDescByName(name) {
        switch (name) {
            case 'equals': return FilterFunctionEnum.Equals;
            case 'notEquals': return FilterFunctionEnum.NotEqual;
            case 'lessThan': return FilterFunctionEnum.LessThan;
            case 'lessThanOrEqualTo': return FilterFunctionEnum.LessThanOrEqual;
            case 'greaterThan': return FilterFunctionEnum.GreaterThan;
            case 'greaterThanOrEqualTo': return FilterFunctionEnum.GreaterThanOrEqual;
            case 'between': return FilterFunctionEnum.Between;
            case 'contains': return FilterFunctionEnum.Contains;
            case 'startsWith': return FilterFunctionEnum.StartsWith;
            case 'endsWith': return FilterFunctionEnum.EndsWith;
            case 'notEmpty': return FilterFunctionEnum.NotEmpty;
            case 'includeAny': return FilterFunctionEnum.IncludeAny;
            case 'includeAll': return FilterFunctionEnum.IncludeAll;
            case 'includeEquals': return FilterFunctionEnum.IncludeEquals;
            case 'includeNone': return FilterFunctionEnum.IncludeNone;
        }
        return FilterFunctionEnum.Equals;
    }
}

class HumanizerNumber {
    static DEFAULT_FORMAT = '0,0[.][00]';
    static CURRENCY_FORMAT = '0,0[.]00';
    static PERCENTAGE_FORMAT = '0,0[.]00%';
    static formatNumber(number) {
        return numeral(number).format(HumanizerNumber.DEFAULT_FORMAT);
    }
    static formatCurrency(amount) {
        return numeral(amount).format(HumanizerNumber.CURRENCY_FORMAT);
    }
    static formatPercentage(amount) {
        return numeral(amount).format(HumanizerNumber.PERCENTAGE_FORMAT);
    }
}

class HumanizerByteSize {
    /**
     *
     * @param sizeInBytes
     * @returns
     */
    static ByteSize(sizeInBytes) {
        let size = sizeInBytes / 1024;
        if (size < 1000) {
            return `${HumanizerNumber.formatNumber(size)} КБ`;
        }
        size = size / 1024;
        if (size < 1000) {
            return `${HumanizerNumber.formatNumber(size)} МБ`;
        }
        size = size / 1024;
        return `${HumanizerNumber.formatNumber(size)} ГБ`;
    }
    ;
}

class HumanizerDateTime {
}

class HumanizerPerson {
    /**
     *
     * @param lastName
     * @param firstName
     * @param patronymic
     * @param substitutes
     * @returns
     */
    static getLastNameWithInitials(lastName, firstName, patronymic, substitutes) {
        if (!lastName) {
            return ((substitutes && substitutes.find((sub) => !!sub)) || '');
        }
        return StringHelper.toUpperCaseAllFirstLetters(`${lastName}${firstName ? ` ${firstName[0]}.` : ''}${patronymic ? ` ${patronymic[0]}.` : ''}`);
    }
    ;
    /**
     *
     * @param firstName
     * @param patronymic
     * @param substitutes
     * @returns
     */
    static getNameWithPatronymic = (firstName, patronymic, substitutes) => {
        if (!firstName) {
            return ((substitutes && substitutes.find((sub) => !!sub)) || '');
        }
        return StringHelper.toUpperCaseAllFirstLetters(`${firstName}${patronymic ? ` ${patronymic}` : ''}`);
    };
    /**
     *
     * @param lastName
     * @param firstName
     * @param patronymic
     * @param substitutes
     * @returns
     */
    static getFullName(lastName, firstName, patronymic, substitutes) {
        if (!lastName) {
            return HumanizerPerson.getNameWithPatronymic(firstName, patronymic, substitutes);
        }
        const nameWithPatronymic = HumanizerPerson.getNameWithPatronymic(firstName, patronymic);
        if (nameWithPatronymic) {
            return StringHelper.toUpperCaseAllFirstLetters(`${lastName} ${nameWithPatronymic}`);
        }
        else {
            return StringHelper.toUpperCaseAllFirstLetters(lastName);
        }
    }
}

class HumanizerString {
}

/**
 * Базовый класс для представления(описания) свойств объектов
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ObjectInfoBase {
    descriptors = [];
    constructor() {
        this.getProperties = this.getProperties.bind(this);
        this.getPropertiesSorted = this.getPropertiesSorted.bind(this);
        this.getPropertyByName = this.getPropertyByName.bind(this);
        this.getFilterFunctionsDesc = this.getFilterFunctionsDesc.bind(this);
    }
    getProperties() {
        return this.descriptors;
    }
    getPropertiesSorted() {
        return this.descriptors.filter(x => (x.sorting && x.sorting.enabled));
    }
    getPropertyByName(name) {
        return this.descriptors.find(x => x.fieldName === name);
    }
    getFilterFunctionsDesc() {
        const filterFunctions = {};
        this.descriptors.forEach((x) => {
            if (x.filtering && x.filtering.enabled) {
                filterFunctions[`${x.fieldName}`] = x.filtering.functionDefault;
            }
        });
        return filterFunctions;
    }
}

/**
 * Перечисление для типа свойства
 */
const PropertyTypeEnum = {
    /**
     * Логический тип
     */
    Boolean: {
        id: 0,
        name: 'Boolean'
    },
    /**
     * Целый тип
     */
    Integer: {
        id: 1,
        name: 'Integer'
    },
    /**
     * Вещественный тип
     */
    Float: {
        id: 2,
        name: 'Float'
    },
    /**
     * Строковый тип
     */
    String: {
        id: 3,
        name: 'String'
    },
    /**
     * Перечисление
     */
    Enum: {
        id: 4,
        name: 'Enum'
    },
    /**
     * Тип даты-времени
     */
    DateTime: {
        id: 5,
        name: 'DateTime'
    },
    /**
     * Глобальный идентификатор в формате UUID
     */
    Guid: {
        id: 6,
        name: 'Guid'
    },
    /**
     * Объект
     */
    Object: {
        id: 7,
        name: 'Object'
    }
};

/**
 * Проверка на значение фильтра свойства
 * @param filterProperty Параметры фильтрации свойства
 */
const hasFilterPropertyValue = (filterProperty) => {
    if (!filterProperty.value && !filterProperty.values)
        return false;
    if (filterProperty.value && !filterProperty.values) {
        if (filterProperty.value === '') {
            return false;
        }
        return true;
    }
    if (!filterProperty.value && filterProperty.values) {
        if (filterProperty.values.length === 0) {
            return false;
        }
        return true;
    }
    return false;
};
/**
 * Проверка на значение фильтров свойств
 * @param filterProperty Список параметров фильтрации свойства
 */
const hasFilterPropertiesValue = (filterProperties) => {
    let findValue = false;
    filterProperties.forEach(x => {
        if (findValue === false) {
            findValue = hasFilterPropertyValue(x);
        }
    });
    return findValue;
};

class RequestHelper {
    static createURLSearchParams(request) {
        if (request) {
            const search = new URLSearchParams();
            if (request.pageInfo) {
                search.append('pageInfo.pageNumber', request.pageInfo.pageNumber.toString());
                search.append('pageInfo.pageSize', request.pageInfo.pageSize.toString());
            }
            if (request.sorting) {
                let index = 0;
                request.sorting.forEach((value) => {
                    search.append(`sorting[${index}].propertyName`, value.propertyName);
                    if (value.isDesc && value.isDesc === true) {
                        search.append(`sorting[${index}].isDesc`, 'true');
                    }
                    index++;
                });
            }
            if (request.filtering) {
                let index = 0;
                request.filtering.forEach((filter) => {
                    if (filter.value) {
                        const value = filter.value;
                        search.append(`filtering[${index}].propertyName`, filter.propertyName);
                        search.append(`filtering[${index}].function`, filter.function.id.toString());
                        search.append(`filtering[${index}].propertyType`, filter.propertyType.id.toString());
                        search.append(`filtering[${index}].value`, value);
                        if (filter.isSensitiveCase) {
                            search.append(`filtering[${index}].isSensitiveCase`, 'true');
                        }
                        index++;
                    }
                    else if (filter.values) {
                        const values = filter.values;
                        search.append(`filtering[${index}].propertyName`, filter.propertyName);
                        search.append(`filtering[${index}].function`, filter.function.id.toString());
                        search.append(`filtering[${index}].propertyType`, filter.propertyType.id.toString());
                        for (let iv = 0; iv < values.length; iv++) {
                            const val = values[iv];
                            search.append(`filtering[${index}].values[${iv}]`, val);
                        }
                    }
                });
            }
            return search;
        }
        else {
            const search = new URLSearchParams();
            search.append('pageInfo.pageNumber', '0');
            search.append('pageInfo.pageSize', '9999');
            return search;
        }
    }
}

class SelectOptionHelper {
    /**
     * Преобразование в типизированный массив
     * @param options Список опций
     * @returns
     */
    static convertToNumber(options) {
        const result = options.map((x) => {
            const value = { text: x.text, value: Number(x.value) };
            return value;
        });
        return result;
    }
    /**
     * Преобразование в типизированный массив
     * @param options Список опций
     * @returns
     */
    static convertToString(options) {
        const result = options.map((x) => {
            const value = { text: x.text, value: String(x.value) };
            return value;
        });
        return result;
    }
    /**
     * Получение корректного значения по умолчанию или начального значения
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    static getDefaultValue(options, initialSelectedValue) {
        if (initialSelectedValue) {
            return initialSelectedValue;
        }
        return options[0].value;
    }
    /**
     * Получение корректного текста по умолчанию или начального значения текста
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    static getDefaultText(options, initialSelectedValue) {
        if (initialSelectedValue) {
            let text = '';
            options.forEach(element => {
                if (element.value === initialSelectedValue) {
                    text = element.text;
                }
            });
            return text;
        }
        return options[0].text;
    }
    /**
     * Получение корректной иконки по умолчанию или начальной иконки
     * @param options Список опций
     * @param initialSelectedValue Начальное значение
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getDefaultIcon(options, initialSelectedValue) {
        if (initialSelectedValue) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let icon = undefined;
            options.forEach(element => {
                if (element.value === initialSelectedValue) {
                    icon = element.icon;
                }
            });
            return icon;
        }
        return options[0].icon;
    }
    /**
     * Получение корректного текста по умолчанию или начального значения текста
     * @param options Список опций
     * @param initialSelectedValues Начальное значение
     * @returns Массив текста выбранных значений
     */
    static getDefaultTexts(options, initialSelectedValues) {
        if (initialSelectedValues && initialSelectedValues.length > 0) {
            const texts = [];
            options.forEach(element => {
                if (initialSelectedValues.find((x) => x === element.value)) {
                    texts.push(element.text);
                }
            });
            return texts;
        }
        else {
            return [];
        }
    }
    /**
     * Получение опций из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Опция
     */
    static getSelectOptionByValue(options, selectedValue) {
        if (selectedValue) {
            for (const element of options) {
                if (element.value === selectedValue) {
                    return element;
                }
            }
        }
        return options[0];
    }
    /**
     * Получение текста из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Текст выбранного значения
     */
    static getTextByValue(options, selectedValue) {
        let text = '';
        if (selectedValue) {
            options.forEach(element => {
                if (element.value === selectedValue) {
                    text = element.text;
                }
            });
        }
        return text;
    }
    /**
     * Получение иконки из значения опций
     * @param options Массив всех опций
     * @param selectedValue Выбранное значение
     * @returns Иконка выбранного значения
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getIconByValue(options, selectedValue) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let icon = undefined;
        if (selectedValue) {
            options.forEach(element => {
                if (element.value === selectedValue) {
                    icon = element.icon;
                }
            });
        }
        return icon;
    }
    /**
     * Получение массива опций из выбранных значений опций
     * @param options Массив всех опций
     * @param selectedValues Выбранные значения
     * @returns Массив опций
     */
    static getSelectOptionsByValues(options, selectedValues) {
        if (selectedValues && selectedValues.length > 0) {
            const optionsSelected = [];
            options.forEach(element => {
                if (selectedValues.find((x) => x === element.value)) {
                    optionsSelected.push(element);
                }
            });
            return optionsSelected;
        }
        else {
            return [];
        }
    }
    /**
     * Получение массива текста из выбранных значений опций
     * @param options Массив всех опций
     * @param selectedValues Выбранные значения
     * @returns Массив текста выбранных значений
     */
    static getTextsByValues(options, selectedValues) {
        if (selectedValues && selectedValues.length > 0) {
            const texts = [];
            options.forEach(element => {
                if (selectedValues.find((x) => x === element.value)) {
                    texts.push(element.text);
                }
            });
            return texts;
        }
        else {
            return [];
        }
    }
    /**
     * Получение массива текста из неопределённого значения(свойства объекта)
     * @param options Массив всех опций
     * @param item Неопределённое значение
     * @returns Массив текста выбранных значений
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getTextsByUnknownValues(options, item) {
        if (Array.isArray(item)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const massive = item;
            if (ArrayHelper.checkIsNumbers(massive)) {
                const numbers = massive.map((x) => {
                    const value = Number(x);
                    return value;
                });
                const result = SelectOptionHelper.getTextsByValues(options, numbers);
                return result;
            }
            else {
                const texts = massive.map((x) => {
                    const value = String(x);
                    return value;
                });
                const result = SelectOptionHelper.getTextsByValues(options, texts);
                return result;
            }
        }
        return [];
    }
}

/**
 * Успешный результат валидации
 */
const ValidationResultSuccess = { error: false };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ValidationSuccess {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validation(_) {
        return ValidationResultSuccess;
    }
}

/**
 * Проверка объекта на поддержку интерфейса IConstantable
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkOfConstantable(value) {
    if (value) {
        return ('isConst' in value) && value.isConst === true;
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу IConstantable
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfConstantable(value) {
    if (checkOfConstantable(value)) {
        return value;
    }
    else {
        // eslint-disable-next-line consistent-return
        return undefined;
    }
}

/**
 * Проверка объекта на поддержку интерфейса IEditable
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkOfEditable(value) {
    if (value) {
        return ('id' in value);
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу IEditable
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfEditable(value) {
    if (checkOfEditable(value)) {
        return value;
    }
    else {
        // eslint-disable-next-line consistent-return
        return undefined;
    }
}

/**
 * Проверка объекта на поддержку интерфейса IGrouping
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkOfGrouping(value) {
    if (value) {
        return ('groupKey' in value) && ('items' in value) && (Array.isArray(value['items']));
    }
    return false;
}
/**
 * Преобразование объекта к интерфейсу IGrouping
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfGrouping(value) {
    if (checkOfGrouping(value)) {
        return value;
    }
    else {
        // eslint-disable-next-line consistent-return
        return undefined;
    }
}

/**
 * Класс для определения маршрута в приложении
 */
class Route {
    /**
     * Маршрут
     */
    path;
    /**
     * Должен ли он быть пользователь авторизован для перехода по данному маршруту
     */
    isShouldBeAuthorized;
    /**
     * Набор разрешений для перехода по данному маршруту
     */
    permissions;
    constructor(path, isShouldBeAuthorized, permissions) {
        this.path = path;
        this.isShouldBeAuthorized = isShouldBeAuthorized;
        this.permissions = permissions;
    }
}

/**
 *
 * @param timeoutInMs
 * @returns
 */
const sleep = (timeoutInMs) => {
    return new Promise((resolve) => setTimeout(resolve, timeoutInMs));
};

export { ApiService, ArrayHelper, BaseCommand, BooleanHelper, BrowserHelper, ColorNames, CommandService, CommandServiceClass, CookiesHelper, DelimiterCommand, DelimiterCommandDefault, EnumHelper, EventCommand, FilterFunctionEnum, FilterFunctionHelper, FunctionHelper, GroupFilterFunctionsArray, GroupFilterFunctionsEnum, GroupFilterFunctionsNumber, GroupFilterFunctionsString, HumanizerByteSize, HumanizerDateTime, HumanizerNumber, HumanizerPerson, HumanizerString, NavigationCommand, NumberHelper, ObjectHelper, ObjectInfoBase, PathHelper, PropertyTypeEnum, RandomHelper, RequestHelper, Route, SelectOptionHelper, StringHelper, ValidationResultSuccess, ValidationSuccess, checkOfConstantable, checkOfEditable, checkOfGrouping, checkOfResult, hasFilterPropertiesValue, hasFilterPropertyValue, instanceOfConstantable, instanceOfEditable, instanceOfGrouping, instanceOfResult, localizationCore, sleep };
