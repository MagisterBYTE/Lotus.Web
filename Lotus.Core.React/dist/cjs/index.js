'use strict';

var lotusCore = require('lotus-core');
var React = require('react');
var reactRedux = require('react-redux');
var toolkit = require('@reduxjs/toolkit');
var jsxRuntime = require('react/jsx-runtime');
var css = require('@emotion/css');
var useRipple = require('use-ripple-hook');
var ReactSelect = require('react-select');
var reactIcons = require('react-icons');
var reactToastify = require('react-toastify');
require('react-toastify/dist/ReactToastify.css');
var material = require('@mui/material');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

class ViewSettingsConstants {
    /**
     * Визуальные настройки для десктоп режима
     */
    static Desktop = {
        headerHeight: 64,
        leftPanelWidthMax: 240,
        leftPanelWidthMin: 60,
        rightPanelWidthMax: 240,
        rightPanelWidthMin: 60,
        footerHeight: 64
    };
    /**
     * Визуальные настройки для мобильного режима в портретной ориентации
     */
    static Portrait = {
        headerHeight: 56,
        leftPanelWidthMax: 240,
        leftPanelWidthMin: 60,
        rightPanelWidthMax: 240,
        rightPanelWidthMin: 60,
        footerHeight: 56
    };
    /**
     * Визуальные настройки для мобильного режима в альбомной ориентации
     */
    static Landscape = {
        headerHeight: 56,
        leftPanelWidthMax: 240,
        leftPanelWidthMin: 120,
        rightPanelWidthMax: 240,
        rightPanelWidthMin: 80,
        footerHeight: 56
    };
}

/**
 * Тип/ориентация экрана
 */
exports.TScreenType = void 0;
(function (TScreenType) {
    /**
     * ПК
     */
    TScreenType["Desktop"] = "Desktop";
    /**
     * Мобильный экран - портретная ориентация
     */
    TScreenType["Portrait"] = "Portrait";
    /**
     * Мобильный экран - альбомная ориентация
     */
    TScreenType["Landscape"] = "Landscape";
})(exports.TScreenType || (exports.TScreenType = {}));

/**
 * Контрольные точки (Breakpoints) - это триггеры настраиваемой ширины
 */
exports.TBreakpoint = void 0;
(function (TBreakpoint) {
    /**
     * Ширина менее 576 пикселей;
     */
    TBreakpoint["XSmall"] = "x-sm";
    /**
     * Ширина не менее 576 пикселей
     */
    TBreakpoint["Small"] = "sm";
    /**
     * Ширина не менее 768 пикселей
     */
    TBreakpoint["Medium"] = "md";
    /**
     * Ширина не менее 992 пикселей
     */
    TBreakpoint["Large"] = "lg";
    /**
     * Ширина не менее 1200 пикселей
     */
    TBreakpoint["ExtraLarge"] = "xl";
    /**
     * Ширина не менее 1400 пикселей
     */
    TBreakpoint["ExtraExtraLarge"] = "xxl";
})(exports.TBreakpoint || (exports.TBreakpoint = {}));

class CssTypesHelper {
    static toPixelWidth(value) {
        if (typeof value === 'string') {
            return lotusCore.NumberHelper.ParseFloat(value) * 16;
        }
        if (typeof value === 'number') {
            return value;
        }
        return 0;
    }
    static toPixelHeight(value) {
        if (typeof value === 'string') {
            return lotusCore.NumberHelper.ParseFloat(value) * 16;
        }
        if (typeof value === 'number') {
            return value;
        }
        return 0;
    }
}

/**
 * Макет сайта по умолчанию для десктопного сайта
 */
const defaultStateDesktop = {
    screenType: exports.TScreenType.Desktop,
    header: {
        height: ViewSettingsConstants.Desktop.headerHeight,
        isVisible: true,
        isVisibleUser: true
    },
    leftPanel: {
        isVisible: true,
        isOpen: false,
        maxWidth: ViewSettingsConstants.Desktop.leftPanelWidthMax,
        minWidth: ViewSettingsConstants.Desktop.leftPanelWidthMin,
        width: ViewSettingsConstants.Desktop.leftPanelWidthMin
    },
    rightPanel: {
        isVisible: false,
        isOpen: false,
        maxWidth: ViewSettingsConstants.Desktop.rightPanelWidthMax,
        minWidth: ViewSettingsConstants.Desktop.rightPanelWidthMin,
        width: ViewSettingsConstants.Desktop.rightPanelWidthMin
    },
    footer: {
        height: ViewSettingsConstants.Desktop.footerHeight,
        isVisible: true,
        isVisibleUser: true,
        isCollapsed: true
    }
};

class LayoutHelper {
    /**
     * Ключ под которым сохраняется макет сайта
     */
    static KeyLayoutState = 'lotus-layoutState';
    /**
     * Получение оптимальной точки Breakpoint для текущей ширины
     * @returns
     */
    static getBreakpoints() {
        if (screen.width > 1800) {
            return exports.TBreakpoint.ExtraLarge;
        }
        return exports.TBreakpoint.Large;
    }
    /**
     * Получение рабочей высоты сайта
     * @param delta Уменьшение к расчету
     * @returns
     */
    static getClientHeight(delta) {
        const layoutState = LayoutHelper.loadFromStorage();
        const isFooter = layoutState.footer.isVisible && layoutState.footer.isVisibleUser;
        const isHeader = layoutState.header.isVisible && layoutState.header.isVisibleUser;
        let screenHeight = Math.min(screen.height, window.innerHeight);
        if (isHeader) {
            screenHeight -= CssTypesHelper.toPixelHeight(layoutState.header.height);
        }
        if (isFooter) {
            screenHeight -= CssTypesHelper.toPixelHeight(layoutState.footer.height);
        }
        if (delta) {
            screenHeight -= delta;
        }
        return screenHeight;
    }
    /**
     * Получение отступа от нижней части
     * @param delta Увеличение к расчету
     * @returns
     */
    static geMarginBottom(delta) {
        const layoutState = LayoutHelper.loadFromStorage();
        const footer = layoutState.footer;
        const isFooter = footer.isVisible;
        let marginBottom = isFooter ? CssTypesHelper.toPixelHeight(footer.height) : 0;
        if (delta) {
            marginBottom += delta;
        }
        return marginBottom;
    }
    /**
     * Загрузка макета сайта из локального хранилища
     * @returns Макет сайта или макет сайта по умолчанию
     */
    static loadFromStorage() {
        const value = localStorage.getItem(LayoutHelper.KeyLayoutState);
        if (value) {
            const layoutState = JSON.parse(value);
            return layoutState;
        }
        else {
            return defaultStateDesktop;
        }
    }
    /**
     * Сохранение текущего макета сайта в локальное хранилище
     * @param layoutState Макет сайта
     */
    static saveToStorage = (layoutState) => {
        const value = JSON.stringify(layoutState);
        localStorage.setItem(LayoutHelper.KeyLayoutState, value);
    };
}

const useAppDispatchCore = () => reactRedux.useDispatch();
const useAppSelectorCore = reactRedux.useSelector;

/**
 * Установить тип экрана
 */
const SET_SCREEN_TYPE_LAYOUT = 'layout/SET_SCREEN_TYPE_LAYOUT';
const setScreenTypeAction = toolkit.createAction(SET_SCREEN_TYPE_LAYOUT);
/**
 * Показать/скрыть левую панель
 */
const SHOW_LEFT_PANEL_LAYOUT = 'layout/SHOW_LEFT_PANEL_LAYOUT';
const showLeftPanelLayoutAction = toolkit.createAction(SHOW_LEFT_PANEL_LAYOUT);
/**
 * Открыть/закрыть левую панель
 */
const OPEN_LEFT_PANEL_LAYOUT = 'layout/OPEN_LEFT_PANEL_LAYOUT';
const openLeftPanelLayoutAction = toolkit.createAction(OPEN_LEFT_PANEL_LAYOUT);
/**
 * Добавить команду к левой панели
 */
const ADD_COMMAND_LEFT_PANEL_LAYOUT = 'layout/ADD_COMMAND_LEFT_PANEL_LAYOUT';
const addCommandLeftPanelLayoutAction = toolkit.createAction(ADD_COMMAND_LEFT_PANEL_LAYOUT);
/**
 * Удалить команду из левой панели
 */
const REMOVE_COMMAND_LEFT_PANEL_LAYOUT = 'layout/REMOVE_COMMAND_LEFT_PANEL_LAYOUT';
const removeCommandLeftPanelLayoutAction = toolkit.createAction(REMOVE_COMMAND_LEFT_PANEL_LAYOUT);
/**
 * Установить команды левой панели
 */
const SET_COMMANDS_LEFT_PANEL_LAYOUT = 'layout/SET_COMMANDS_LEFT_PANEL_LAYOUT';
const setCommandsLeftPanelLayoutAction = toolkit.createAction(SET_COMMANDS_LEFT_PANEL_LAYOUT);
/**
 * Установить ширину левой панели
 */
const SET_WIDTH_LEFT_PANEL_LAYOUT = 'layout/SET_WIDTH_LEFT_PANEL_LAYOUT';
const setWidthLeftPanelLayoutAction = toolkit.createAction(SET_WIDTH_LEFT_PANEL_LAYOUT);
/**
 * Установить ширину правой панели
 */
const SHOW_RIGHT_PANEL_LAYOUT = 'layout/SHOW_RIGHT_PANEL_LAYOUT';
const showRightPanelLayoutAction = toolkit.createAction(SHOW_RIGHT_PANEL_LAYOUT);
/**
 * Показать/скрыть заголовок
 */
const SHOW_HEADER_LAYOUT = 'layout/SHOW_HEADER_LAYOUT';
const showHeaderLayoutAction = toolkit.createAction(SHOW_HEADER_LAYOUT);
/**
 * Показать/скрыть заголовок полльзователем
 */
const SHOW_HEADER_USER_LAYOUT = 'layout/SHOW_HEADER_USER_LAYOUT';
const showHeaderUserLayoutAction = toolkit.createAction(SHOW_HEADER_USER_LAYOUT);
/**
 * Показать/скрыть подвал
 */
const SHOW_FOOTER_LAYOUT = 'layout/SHOW_FOOTER_LAYOUT';
const showFooterLayoutAction = toolkit.createAction(SHOW_FOOTER_LAYOUT);
/**
 * Показать/скрыть пользователем
 */
const SHOW_FOOTER_USER_LAYOUT = 'layout/SHOW_FOOTER_USER_LAYOUT';
const showFooterUserLayoutAction = toolkit.createAction(SHOW_FOOTER_USER_LAYOUT);
/**
 * Свернуть/развернуть подвал
 */
const COLLAPSE_FOOTER_LAYOUT = 'layout/COLLAPSE_FOOTER_LAYOUT';
const collapseFooterLayoutAction = toolkit.createAction(COLLAPSE_FOOTER_LAYOUT);

const initialState$1 = LayoutHelper.loadFromStorage();
const layoutSlice = toolkit.createSlice({
    name: 'layout',
    initialState: initialState$1,
    reducers: {},
    extraReducers: (builder) => {
        //
        // В целом для сайта
        //       
        builder.addCase(setScreenTypeAction, (state, action) => {
            state.screenType = action.payload;
            switch (action.payload) {
                case exports.TScreenType.Desktop:
                    {
                        state.header.isVisible = true;
                        state.header.height = ViewSettingsConstants.Desktop.headerHeight;
                        state.leftPanel.maxWidth = ViewSettingsConstants.Desktop.leftPanelWidthMax;
                        state.leftPanel.minWidth = ViewSettingsConstants.Desktop.leftPanelWidthMin;
                        state.leftPanel.width = ViewSettingsConstants.Desktop.leftPanelWidthMin;
                        state.rightPanel.maxWidth = ViewSettingsConstants.Desktop.rightPanelWidthMax;
                        state.rightPanel.minWidth = ViewSettingsConstants.Desktop.rightPanelWidthMin;
                        state.rightPanel.width = ViewSettingsConstants.Desktop.rightPanelWidthMin;
                        state.footer.height = ViewSettingsConstants.Desktop.footerHeight;
                        state.footer.isVisible = true;
                    }
                    break;
                case exports.TScreenType.Landscape:
                    {
                        state.header.isVisible = false;
                        state.leftPanel.maxWidth = ViewSettingsConstants.Landscape.leftPanelWidthMax;
                        state.leftPanel.minWidth = ViewSettingsConstants.Landscape.leftPanelWidthMin;
                        state.leftPanel.width = ViewSettingsConstants.Landscape.leftPanelWidthMin;
                        state.rightPanel.maxWidth = ViewSettingsConstants.Landscape.rightPanelWidthMax;
                        state.rightPanel.minWidth = ViewSettingsConstants.Landscape.rightPanelWidthMin;
                        state.rightPanel.width = ViewSettingsConstants.Landscape.rightPanelWidthMin;
                        state.footer.isVisible = false;
                    }
                    break;
                case exports.TScreenType.Portrait:
                    {
                        state.header.isVisible = true;
                        state.header.height = ViewSettingsConstants.Portrait.headerHeight;
                        state.leftPanel.maxWidth = ViewSettingsConstants.Portrait.leftPanelWidthMax;
                        state.leftPanel.minWidth = ViewSettingsConstants.Portrait.leftPanelWidthMin;
                        state.leftPanel.width = ViewSettingsConstants.Portrait.leftPanelWidthMin;
                        state.rightPanel.maxWidth = ViewSettingsConstants.Portrait.rightPanelWidthMax;
                        state.rightPanel.minWidth = ViewSettingsConstants.Portrait.rightPanelWidthMin;
                        state.rightPanel.width = ViewSettingsConstants.Portrait.rightPanelWidthMin;
                        state.footer.height = ViewSettingsConstants.Portrait.footerHeight;
                        state.footer.isVisible = true;
                    }
                    break;
            }
            LayoutHelper.saveToStorage(state);
        });
        //
        // Шапка
        //    
        builder.addCase(showHeaderLayoutAction, (state, action) => {
            state.header.isVisible = action.payload;
            LayoutHelper.saveToStorage(state);
        });
        builder.addCase(showHeaderUserLayoutAction, (state, action) => {
            state.header.isVisibleUser = action.payload;
            LayoutHelper.saveToStorage(state);
        });
        //
        // Левая панель
        //      
        builder.addCase(showLeftPanelLayoutAction, (state, action) => {
            state.leftPanel.isVisible = action.payload;
            LayoutHelper.saveToStorage(state);
        });
        builder.addCase(openLeftPanelLayoutAction, (state, action) => {
            state.leftPanel.isOpen = action.payload;
            if (action.payload) {
                state.leftPanel.width = state.leftPanel.maxWidth;
            }
            else {
                state.leftPanel.width = state.leftPanel.minWidth;
            }
            LayoutHelper.saveToStorage(state);
        });
        builder.addCase(setWidthLeftPanelLayoutAction, (state, action) => {
            state.leftPanel.width = action.payload;
            LayoutHelper.saveToStorage(state);
        });
        builder.addCase(addCommandLeftPanelLayoutAction, (state, action) => {
            if (state.leftPanelCommands) {
                if (state.leftPanelCommands.includes(action.payload) === false) {
                    state.leftPanelCommands.push(action.payload);
                }
            }
            else {
                state.leftPanelCommands = [action.payload];
            }
            LayoutHelper.saveToStorage(state);
        });
        builder.addCase(removeCommandLeftPanelLayoutAction, (state, action) => {
            if (state.leftPanelCommands) {
                state.leftPanelCommands = state.leftPanelCommands.filter(x => x !== action.payload);
            }
            LayoutHelper.saveToStorage(state);
        });
        builder.addCase(setCommandsLeftPanelLayoutAction, (state, action) => {
            state.leftPanelCommands = [...action.payload];
            LayoutHelper.saveToStorage(state);
        });
        //
        // Правая панель
        //    
        builder.addCase(showRightPanelLayoutAction, (state, action) => {
            state.rightPanel.isVisible = action.payload;
            LayoutHelper.saveToStorage(state);
        });
        //
        // Подвал
        //
        builder.addCase(showFooterLayoutAction, (state, action) => {
            state.footer.isVisible = action.payload;
            LayoutHelper.saveToStorage(state);
        });
        builder.addCase(showFooterUserLayoutAction, (state, action) => {
            state.footer.isVisibleUser = action.payload;
            LayoutHelper.saveToStorage(state);
        });
        builder.addCase(collapseFooterLayoutAction, (state, action) => {
            state.footer.isCollapsed = action.payload;
            LayoutHelper.saveToStorage(state);
        });
    }
});

const SHOW_ALERT_FEEDBACK = 'feedback/SHOW_ALERT_FEEDBACK';
const showAlertFeedbackAction = toolkit.createAction(SHOW_ALERT_FEEDBACK);
const HIDE_ALERT_FEEDBACK = 'feedback/HIDE_ALERT_FEEDBACK';
const hideAlertFeedbackAction = toolkit.createAction(HIDE_ALERT_FEEDBACK);

const initialState = {
    alertMessage: '',
    alertOpen: false,
    alertType: 'Info'
};
const feedbackSlice = toolkit.createSlice({
    name: 'feedback',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(showAlertFeedbackAction, (state, action) => {
            state.alertMessage = action.payload.message;
            state.alertOpen = true;
            state.alertType = action.payload.type;
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(hideAlertFeedbackAction, (state, _) => {
            state.alertMessage = '';
            state.alertOpen = false;
        });
    }
});

function makeStoreCore() {
    return toolkit.configureStore({
        reducer: {
            feedback: feedbackSlice.reducer,
            layout: layoutSlice.reducer
        }
    });
}
const storeCore = makeStoreCore();

const useScreenTypeChanged = () => {
    const isDesktopQuery = '(min-width: 1280px)';
    const isPortraitQuery = '(orientation: portrait)';
    const dispacth = useAppDispatchCore();
    const handleScreenTypeChange = () => {
        const isDesktop = window.matchMedia(isDesktopQuery).matches;
        const isPortrait = window.matchMedia(isPortraitQuery).matches;
        if (isPortrait) {
            dispacth(setScreenTypeAction(exports.TScreenType.Portrait));
        }
        else {
            if (isDesktop) {
                dispacth(setScreenTypeAction(exports.TScreenType.Desktop));
            }
            else {
                dispacth(setScreenTypeAction(exports.TScreenType.Landscape));
            }
        }
    };
    React.useLayoutEffect(() => {
        window.addEventListener('resize', handleScreenTypeChange);
        window.addEventListener('orientationchange', handleScreenTypeChange);
        return () => {
            window.removeEventListener('resize', handleScreenTypeChange);
            window.removeEventListener('orientationchange', handleScreenTypeChange);
        };
    }, []);
};

const useLayoutState = () => {
    return useAppSelectorCore((state) => state.layout);
};

const defaultRectOffset = { left: 1, top: 1, right: 1, bottom: 1 };
const useActualGraphicsSize = (margin = defaultRectOffset) => {
    const marginLeftDefault = margin.left;
    const marginTopDefault = margin.top;
    const marginRightDefault = margin.right;
    const marginBottomDefault = margin.bottom;
    const layoutState = useLayoutState();
    const calcHeight = () => {
        const graphicsHeight = LayoutHelper.getClientHeight(marginTopDefault + marginBottomDefault);
        return graphicsHeight;
    };
    const calcWidth = () => {
        let graphicsWidth = window.innerWidth - marginLeftDefault - marginRightDefault;
        if (layoutState.screenType === exports.TScreenType.Landscape) {
            graphicsWidth -= CssTypesHelper.toPixelWidth(layoutState.leftPanel.minWidth);
        }
        return graphicsWidth;
    };
    const calcMarginTop = () => {
        if (layoutState.screenType !== exports.TScreenType.Landscape) {
            return (marginTopDefault + CssTypesHelper.toPixelHeight(layoutState.header.height));
        }
        return marginTopDefault;
    };
    const [width, setWidth] = React.useState(calcWidth());
    const [height, setHeight] = React.useState(calcHeight());
    const [marginTop, setMarginTop] = React.useState(calcMarginTop());
    const handleScreenResizeOrOrientation = () => {
        setHeight(calcHeight());
        setWidth(calcWidth());
        setMarginTop(calcMarginTop());
    };
    React.useLayoutEffect(() => {
        window.addEventListener('resize', handleScreenResizeOrOrientation);
        window.addEventListener('orientationchange', handleScreenResizeOrOrientation);
        handleScreenResizeOrOrientation();
        return () => {
            window.removeEventListener('resize', handleScreenResizeOrOrientation);
            window.removeEventListener('orientationchange', handleScreenResizeOrOrientation);
        };
    }, []);
    return {
        left: marginLeftDefault,
        right: marginRightDefault,
        top: marginTop,
        bottom: marginBottomDefault,
        width: width,
        height: height
    };
};

const AppFooter = (props) => {
    const layoutState = useLayoutState();
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: layoutState.footer.isVisibleUser && layoutState.footer.isVisible &&
            jsxRuntime.jsx("footer", { ...props, className: 'lotus-app-footer', children: props.children }) });
};

const AppHeader = (props) => {
    const layoutState = useLayoutState();
    useAppDispatchCore();
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: layoutState.header.isVisibleUser && layoutState.header.isVisible &&
            jsxRuntime.jsx("header", { ...props, className: 'lotus-app-header', children: props.children }) });
};

const Grid = (props) => {
    const { gridTemplateColumns, gridTemplateRows, columnGap, rowGap, horizontalAlign, verticalAlign, horizontalContentAlign, verticalContentAlign, children, ...divProps } = props;
    return (jsxRuntime.jsx("div", { ...divProps, style: {
            display: 'grid',
            gridTemplateColumns: gridTemplateColumns,
            gridTemplateRows: gridTemplateRows,
            columnGap: columnGap,
            rowGap: rowGap,
            justifyContent: horizontalAlign ?? 'stretch',
            alignContent: verticalAlign ?? 'center',
            justifyItems: horizontalContentAlign ?? 'start',
            alignItems: verticalContentAlign ?? 'center'
        }, children: children }));
};

const HorizontalStack = (props) => {
    const { gap, alignItems, justifyContent, wrap, children, fullWidth, fullHeight, ...divProps } = props;
    return (jsxRuntime.jsx("div", { ...divProps, style: {
            display: 'flex',
            flexDirection: 'row',
            gap: gap,
            alignItems: alignItems ?? 'baseline',
            justifyContent: justifyContent ?? 'flex-start',
            flexWrap: wrap,
            width: fullWidth ? '100%' : undefined,
            height: fullHeight ? '100%' : undefined
        }, children: children }));
};

const VerticalStack = (props) => {
    const { gap, alignItems, justifyContent, wrap, children, fullWidth, fullHeight, ...divProps } = props;
    return (jsxRuntime.jsx("div", { ...divProps, style: {
            display: 'flex',
            flexDirection: 'column',
            gap: gap,
            alignItems: alignItems ?? 'start',
            justifyContent: justifyContent ?? 'flex-start',
            flexWrap: wrap,
            width: fullWidth ? '100%' : undefined,
            height: fullHeight ? '100%' : undefined
        }, children: children }));
};

const AppLeftPanel = (props) => {
    return jsxRuntime.jsx("nav", { ...props, children: jsxRuntime.jsx(VerticalStack, { children: props.children }) });
};

/**
 * Внутренний отступ от содержимого элементов UI
 */
exports.TControlPadding = void 0;
(function (TControlPadding) {
    /**
     * Минимальный отступ
     */
    TControlPadding["Minimum"] = "minimum";
    /**
     * Нормальный(оптимальный) отступ
     */
    TControlPadding["Normal"] = "normal";
    /**
     * Увеличенный отступ
     */
    TControlPadding["Enlarged"] = "enlarged";
})(exports.TControlPadding || (exports.TControlPadding = {}));

/**
 * Основной тип цвета
 */
exports.TColorType = void 0;
(function (TColorType) {
    TColorType["Primary"] = "primary";
    TColorType["Secondary"] = "secondary";
    TColorType["Success"] = "success";
    TColorType["Danger"] = "danger";
    TColorType["Warning"] = "warning";
    TColorType["Info"] = "info";
    TColorType["Accent"] = "accent";
    TColorType["Light"] = "light";
    TColorType["Dark"] = "dark";
})(exports.TColorType || (exports.TColorType = {}));

/**
 * Размер элементов UI
 */
exports.TControlSize = void 0;
(function (TControlSize) {
    /**
     *
     */
    TControlSize["Smaller"] = "smaller";
    /**
     *
     */
    TControlSize["Small"] = "small";
    /**
     *
     */
    TControlSize["Medium"] = "medium";
    /**
     *
     */
    TControlSize["Large"] = "large";
})(exports.TControlSize || (exports.TControlSize = {}));

/**
 * Состояние элементов UI
 */
exports.TControlState = void 0;
(function (TControlState) {
    /**
     * Обычное состояние
     */
    TControlState["Normal"] = "normal";
    /**
     * Состояние при наведении
     */
    TControlState["Hover"] = "hover";
    /**
     * Состояние при нажатии
     */
    TControlState["Pressed"] = "pressed";
    /**
     * Состояние в статусе выбора
     */
    TControlState["Selected"] = "selected";
    /**
     * Состояние в статусе фокуса
     */
    TControlState["Focus"] = "focus";
    /**
     * Состояние в недоступного элемента
     */
    TControlState["Disabled"] = "disabled";
})(exports.TControlState || (exports.TControlState = {}));

/**
 * Плотность размещения элементов UI
 */
exports.TPlacementDensity = void 0;
(function (TPlacementDensity) {
    /**
     * Плотное размещение
     */
    TPlacementDensity["Density"] = "Density";
    /**
     * Обычное размещение
     */
    TPlacementDensity["Normal"] = "Normal";
    /**
     * Просторное размещение
     */
    TPlacementDensity["Spacious"] = "Spacious";
})(exports.TPlacementDensity || (exports.TPlacementDensity = {}));

class ThemeConstants {
    /**
     * Ключ под которым сохраняется тема сайта
     */
    static SaveKey = 'lotus-theme';
    /**
     * Скорость переходов анимации/состояния, в миллисекундах
     */
    static TransitionSpeed = 400;
    /**
     * Скорость переходов анимации/состояния, в миллисекундах
     */
    static TransitionSpeedFast = 250;
    /**
     * Прозрачность для элементов UI которые недоступны
     */
    static OpacityForDisabled = 0.65;
}

class ThemeHelper {
    /**
     * Загрузка темы из локального хранилища
     * @returns Тема или тема по умолчанию по умолчанию
     */
    static loadFromStorage() {
        const value = localStorage.getItem(ThemeConstants.SaveKey);
        if (value) {
            return value;
        }
        else {
            return 'light';
        }
    }
    /**
     * Сохранение темы в локальное хранилище
     * @param theme Тема
     */
    static saveToStorage(theme) {
        localStorage.setItem(ThemeConstants.SaveKey, theme);
    }
    /**
     * Получение оптимального цвета текста при указанном фоновом цвете
     * @param background Цвет фона
     * @returns Оптимальный цвет текста
     */
    static getOptimalForegroundColor(background) {
        if (background) {
            switch (background) {
                case exports.TColorType.Primary: return exports.TColorType.Light;
                case exports.TColorType.Secondary: return exports.TColorType.Light;
                case exports.TColorType.Success: return exports.TColorType.Light;
                case exports.TColorType.Danger: return exports.TColorType.Light;
                case exports.TColorType.Warning: return exports.TColorType.Dark;
                case exports.TColorType.Info: return exports.TColorType.Dark;
                case exports.TColorType.Accent: return exports.TColorType.Light;
                case exports.TColorType.Light: return exports.TColorType.Dark;
                case exports.TColorType.Dark: return exports.TColorType.Light;
            }
        }
        return exports.TColorType.Light;
    }
    /**
     * Получение оптимального размера шрифта при указанном размере элемента UI
     * @param size Размере элемента UI
     * @returns Оптимальный размера шрифта
     */
    static getFontSizeByControlSize(size) {
        if (size) {
            switch (size) {
                case exports.TControlSize.Smaller: return 'x-small';
                case exports.TControlSize.Small: return 'small';
                case exports.TControlSize.Medium: return 'medium';
                case exports.TControlSize.Large: return 'large';
            }
        }
        return 'medium';
    }
    /**
     * Получение оптимального размера шрифта при указанном размере элемента UI как свойства CSS
     * @param size Размере элемента UI
     * @returns Оптимальный размера шрифта как свойства CSS
     */
    static getFontSizeByControlSizeAsCSS(size) {
        if (size) {
            switch (size) {
                case exports.TControlSize.Smaller: return { fontSize: 'x-small' };
                case exports.TControlSize.Small: return { fontSize: 'small' };
                case exports.TControlSize.Medium: return { fontSize: 'medium' };
                case exports.TControlSize.Large: return { fontSize: 'large' };
            }
        }
        return { fontSize: 'medium' };
    }
    /**
     * Конвертация размера элемента UI в соответствующий размер шрифта в пикселях
     * @param size Размере элемента UI
     * @returns Соответствующий размер шрифта в пикселях
     */
    static convertControlSizeToFontSizeInPixel(size) {
        if (size) {
            switch (size) {
                case exports.TControlSize.Smaller: return 10;
                case exports.TControlSize.Small: return 13;
                case exports.TControlSize.Medium: return 16;
                case exports.TControlSize.Large: return 19;
            }
        }
        return 16;
    }
    /**
     * Конвертация размера элемента UI в соответствующий размер шрифта в rem
     * @param size Размере элемента UI
     * @returns Соответствующий размер шрифта в rem
     */
    static convertControlSizeToFontSizeInRem(size) {
        if (size) {
            switch (size) {
                case exports.TControlSize.Smaller: return 10 / 16;
                case exports.TControlSize.Small: return 13 / 16;
                case exports.TControlSize.Medium: return 1;
                case exports.TControlSize.Large: return 19 / 16;
            }
        }
        return 1;
    }
    /**
     * Конвертация размера элемента UI в соответствующий размер иконки в rem
     * @param size Размере элемента UI
     * @returns Соответствующий размер иконки в rem
     */
    static convertControlSizeToIconSizeInRem(size) {
        if (size) {
            switch (size) {
                case exports.TControlSize.Smaller: return 10 / 16 * 1.5;
                case exports.TControlSize.Small: return 13 / 16 * 1.5;
                case exports.TControlSize.Medium: return 1.5;
                case exports.TControlSize.Large: return 19 / 16 * 1.5;
            }
        }
        return 1.5;
    }
    /**
     * Конвертация размера элемента UI в соответствующий размер иконки в пикселя
     * @param size Размере элемента UI
     * @returns Соответствующий размер иконки в пикселя
     */
    static convertControlSizeToIconSizeInPixel(size) {
        if (size) {
            switch (size) {
                case exports.TControlSize.Smaller: return 10 * 1.5;
                case exports.TControlSize.Small: return 13 * 1.5;
                case exports.TControlSize.Medium: return 16 * 1.5;
                case exports.TControlSize.Large: return 19 * 1.5;
            }
        }
        return 16 * 1.5;
    }
    /**
     * Получить свойства CSS по семейству шрифтов в виде текста
     * @returns Свойства CSS по семейству шрифтов в виде текста
     */
    static getFontFamilyPropsAsText() {
        return 'font-family: var(--lotus-font-main);';
    }
    /**
     * Получить свойства CSS по семейству шрифтов в виде CSSProperties
     * @returns Свойства CSS по семейству шрифтов в виде CSSProperties
     */
    static getFontFamilyPropsAsCSS() {
        return { fontFamily: 'var(--lotus-font-main);' };
    }
    /**
     * Получить свойства CSS по границе в виде текста
     * @returns Свойства CSS по границе в виде текста
     */
    static getBorderPropsAsText() {
        return `border-width: var(--lotus-border-width);
    border-style: var(--lotus-border-style);
    border-radius: var(--lotus-border-radius);`;
    }
    /**
     * Получить свойства CSS по границе в виде CSSProperties
     * @returns Свойства CSS по границе в виде CSSProperties
     */
    static getBorderPropsAsCSS() {
        return {
            borderWidth: 'var(--lotus-border-width);',
            borderStyle: 'var(--lotus-border-style);',
            borderRadius: 'var(--lotus-border-radius);'
        };
    }
    /**
     * Получить свойства CSS по переходу в виде текста
     * @returns Свойства CSS по переходу в виде текста
     */
    static getTransitionPropsAsText() {
        return `transition: background-color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`;
    }
    /**
     * Получить свойства CSS по переходу в виде CSSProperties
     * @returns Свойства CSS по переходу в виде CSSProperties
     */
    static getTransitionPropsAsCSS() {
        return {
            transition: `background-color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`
        };
    }
    /**
     * Получить свойства CSS по прозрачности для неактивного элемента UI в виде текста
     * @returns Свойства CSS по прозрачности для неактивного элемента UI в виде текста
     */
    static getOpacityPropsForDisabledAsText() {
        return `opacity: ${ThemeConstants.OpacityForDisabled};`;
    }
    /**
     * Получить свойства CSS по прозрачности для неактивного элемента UI в виде текста
     * @returns Свойства CSS по прозрачности для неактивного элемента UI в виде текста
     */
    static getOpacityPropsForDisabledAsCSS() {
        return { opacity: `${ThemeConstants.OpacityForDisabled};` };
    }
}

const ThemeContext = React.createContext(undefined);

const ThemeProvider = (props) => {
    const sizeControl = {
        smaller: {
            padding: '0.25em 0.25em',
            fontSize: 'smaller'
        },
        small: {
            padding: '0.35em 0.35em',
            fontSize: 'small'
        },
        medium: {
            padding: '0.45em 0.45em',
            fontSize: 'medium'
        },
        large: {
            padding: '0.5em 0.5em',
            fontSize: 'large'
        }
    };
    const [theme, setTheme] = React.useState(ThemeHelper.loadFromStorage());
    React.useEffect(() => {
        ThemeHelper.saveToStorage(theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    return (jsxRuntime.jsx(ThemeContext.Provider, { value: {
            theme,
            sizeControl,
            setTheme
        }, children: props.children }));
};

const useThemeSelector = () => {
    const context = React__namespace.useContext(ThemeContext);
    if (!context) {
        throw new Error('You can use "useTheme" hook only within a <ThemeProvider> component.');
    }
    return context;
};

/**
 * Вариант отображения кнопки
 */
exports.TButtonVariant = void 0;
(function (TButtonVariant) {
    /**
     * Фоновый цвет
     */
    TButtonVariant["Filled"] = "Filled";
    /**
     * Только граница
     */
    TButtonVariant["Outline"] = "Outline";
    /**
     * Только текст
     */
    TButtonVariant["Text"] = "Text";
})(exports.TButtonVariant || (exports.TButtonVariant = {}));

class ButtonHelper {
    static getBorderColorProps(color, variant, state) {
        switch (state) {
            case exports.TControlState.Normal:
                {
                    switch (variant) {
                        case exports.TButtonVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
                        case exports.TButtonVariant.Outline: return `border-color: var(--lotus-color-${color});`;
                        case exports.TButtonVariant.Text: return 'border: none !important;';
                    }
                }
                break;
            case exports.TControlState.Hover:
                switch (variant) {
                    case exports.TButtonVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
                    case exports.TButtonVariant.Outline: return `border-color: var(--lotus-color-${color}Dark);`;
                    case exports.TButtonVariant.Text: return 'border: none !important;';
                }
                break;
            case exports.TControlState.Pressed:
                switch (variant) {
                    case exports.TButtonVariant.Filled: return `border-color: var(--lotus-color-${color}Darker);`;
                    case exports.TButtonVariant.Outline: return `border-color: var(--lotus-color-${color}Darker);`;
                    case exports.TButtonVariant.Text: return 'border: none !important;';
                }
                break;
            case exports.TControlState.Selected:
            case exports.TControlState.Focus:
            case exports.TControlState.Disabled:
                switch (variant) {
                    case exports.TButtonVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
                    case exports.TButtonVariant.Outline: return `border-color: var(--lotus-color-${color});`;
                    case exports.TButtonVariant.Text: return 'border: none !important;';
                }
                break;
        }
        return '';
    }
    static getBackgroundColorProps(color, variant, state) {
        switch (state) {
            case exports.TControlState.Normal:
                {
                    switch (variant) {
                        case exports.TButtonVariant.Filled: return `background-color: var(--lotus-color-${color});`;
                        case exports.TButtonVariant.Outline: return `background-color: var(--lotus-color-${'light'});`;
                        case exports.TButtonVariant.Text: return `background-color: var(--lotus-color-${'light'});`;
                    }
                }
                break;
            case exports.TControlState.Hover:
                switch (variant) {
                    case exports.TButtonVariant.Filled: return `background-color: var(--lotus-color-${color}Dark);`;
                    case exports.TButtonVariant.Outline: return `background-color: var(--lotus-color-${color}Palest);`;
                    case exports.TButtonVariant.Text: return `background-color: var(--lotus-color-${color}Palest);`;
                }
                break;
            case exports.TControlState.Pressed:
                switch (variant) {
                    case exports.TButtonVariant.Filled: return `background-color: var(--lotus-color-${color}Darker);`;
                    case exports.TButtonVariant.Outline: return `background-color: var(--lotus-color-${color}Palest);`;
                    case exports.TButtonVariant.Text: return `background-color: var(--lotus-color-${color}Palest);`;
                }
                break;
            case exports.TControlState.Selected:
            case exports.TControlState.Focus:
            case exports.TControlState.Disabled:
                switch (variant) {
                    case exports.TButtonVariant.Filled: return `background-color: var(--lotus-color-${color});`;
                    case exports.TButtonVariant.Outline: return `background-color: var(--lotus-color-${'light'});`;
                    case exports.TButtonVariant.Text: return `background-color: var(--lotus-color-${'light'});`;
                }
                break;
        }
        return '';
    }
    static getColorProps(color, variant, state) {
        switch (state) {
            case exports.TControlState.Normal:
                {
                    switch (variant) {
                        case exports.TButtonVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
                        case exports.TButtonVariant.Outline: return `color: var(--lotus-color-${color});`;
                        case exports.TButtonVariant.Text: return `color: var(--lotus-color-${color});`;
                    }
                }
                break;
            case exports.TControlState.Hover:
                switch (variant) {
                    case exports.TButtonVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
                    case exports.TButtonVariant.Outline: return `color: var(--lotus-color-${color}Dark);`;
                    case exports.TButtonVariant.Text:
                        return `color: var(--lotus-color-${color}Dark);`;
                }
                break;
            case exports.TControlState.Pressed:
                switch (variant) {
                    case exports.TButtonVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
                    case exports.TButtonVariant.Outline: return `color: var(--lotus-color-${color}Darker);`;
                    case exports.TButtonVariant.Text:
                        return `color: var(--lotus-color-${color}Darker);`;
                }
                break;
            case exports.TControlState.Selected:
            case exports.TControlState.Focus:
            case exports.TControlState.Disabled:
                switch (variant) {
                    case exports.TButtonVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
                    case exports.TButtonVariant.Outline: return `color: var(--lotus-color-${color});`;
                    case exports.TButtonVariant.Text:
                        return `color: var(--lotus-color-${color});`;
                }
                break;
        }
        return '';
    }
    static getPaddingSidesProps(size, paddingControl) {
        switch (size) {
            case exports.TControlSize.Smaller:
                {
                    switch (paddingControl) {
                        case exports.TControlPadding.Minimum: return 'padding-left: 0.1rem; padding-right: 0.1rem;';
                        case exports.TControlPadding.Normal: return 'padding-left: 0.2rem; padding-right: 0.2rem;';
                        case exports.TControlPadding.Enlarged: return 'padding-left: 0.35rem; padding-right: 0.35rem;';
                    }
                }
                break;
            case exports.TControlSize.Small:
                {
                    switch (paddingControl) {
                        case exports.TControlPadding.Minimum: return 'padding-left: 0.15rem; padding-right: 0.15rem;';
                        case exports.TControlPadding.Normal: return 'padding-left: 0.25rem; padding-right: 0.25rem;';
                        case exports.TControlPadding.Enlarged: return 'padding-left: 0.35rem; padding-right: 0.35rem;';
                    }
                }
                break;
            case exports.TControlSize.Medium:
                {
                    switch (paddingControl) {
                        case exports.TControlPadding.Minimum: return 'padding-left: 0.2rem; padding-right: 0.2rem;';
                        case exports.TControlPadding.Normal: return 'padding-left: 0.5rem; padding-right: 0.5rem;';
                        case exports.TControlPadding.Enlarged: return 'padding-left: 0.75rem; padding-right: 0.75rem;';
                    }
                }
                break;
            case exports.TControlSize.Large:
                {
                    switch (paddingControl) {
                        case exports.TControlPadding.Minimum: return 'padding-left: 0.25rem; padding-right: 0.25rem;';
                        case exports.TControlPadding.Normal: return 'padding-left: 0.55rem; padding-right: 0.55rem;';
                        case exports.TControlPadding.Enlarged: return 'padding-left: 0.8rem; padding-right: 0.8rem;';
                    }
                }
                break;
        }
        return '';
    }
}

const Button = ({ color = exports.TColorType.Primary, size = exports.TControlSize.Medium, variant = exports.TButtonVariant.Filled, paddingControl = exports.TControlPadding.Normal, ...propsButton }) => {
    const buttonMain = css.css `
    ${ThemeHelper.getFontFamilyPropsAsText()}
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    ${ThemeHelper.getBorderPropsAsText()}
    ${ThemeHelper.getTransitionPropsAsText()}
    ${ButtonHelper.getBorderColorProps(color, variant, exports.TControlState.Normal)}
    ${ButtonHelper.getColorProps(color, variant, exports.TControlState.Normal)}
    ${ButtonHelper.getBackgroundColorProps(color, variant, exports.TControlState.Normal)}
    ${ButtonHelper.getPaddingSidesProps(size, paddingControl)}
      &:hover {
        ${ButtonHelper.getBorderColorProps(color, variant, exports.TControlState.Hover)}
        ${ButtonHelper.getBackgroundColorProps(color, variant, exports.TControlState.Hover)}
        ${ButtonHelper.getColorProps(color, variant, exports.TControlState.Hover)}
      }
      &:active {
        ${ButtonHelper.getBorderColorProps(color, variant, exports.TControlState.Pressed)}
        ${ButtonHelper.getBackgroundColorProps(color, variant, exports.TControlState.Pressed)}
        ${ButtonHelper.getColorProps(color, variant, exports.TControlState.Pressed)}
      }
      &:disabled {
        ${ButtonHelper.getBorderColorProps(color, variant, exports.TControlState.Disabled)}
        ${ButtonHelper.getBackgroundColorProps(color, variant, exports.TControlState.Disabled)}
        ${ButtonHelper.getColorProps(color, variant, exports.TControlState.Disabled)}
        ${ThemeHelper.getOpacityPropsForDisabledAsText()}
      }
  `;
    const buttonClass = css.cx(buttonMain, `lotus-size-${size}-${paddingControl}`);
    const [ripple, event] = useRipple({ duration: ThemeConstants.TransitionSpeed, color: 'rgba(255, 255, 255, 0.5)', disabled: propsButton.disabled });
    return (jsxRuntime.jsx("button", { ...propsButton, ref: ripple, className: buttonClass, onPointerDown: event, children: propsButton.children }));
};

/**
 * Вариант отображения чипа
 */
exports.TChipVariant = void 0;
(function (TChipVariant) {
    /**
     * Фоновый цвет
     */
    TChipVariant["Filled"] = "Filled";
    /**
     * Только граница
     */
    TChipVariant["Outline"] = "Outline";
})(exports.TChipVariant || (exports.TChipVariant = {}));

class ChipHelper {
    static getBorderColorProps(color, variant, state) {
        switch (state) {
            case exports.TControlState.Normal:
                {
                    switch (variant) {
                        case exports.TChipVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
                        case exports.TChipVariant.Outline: return `border-color: var(--lotus-color-${color});`;
                    }
                }
                break;
            case exports.TControlState.Hover:
                switch (variant) {
                    case exports.TChipVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
                    case exports.TChipVariant.Outline: return `border-color: var(--lotus-color-${color}Dark);`;
                }
                break;
            case exports.TControlState.Pressed:
                switch (variant) {
                    case exports.TChipVariant.Filled: return `border-color: var(--lotus-color-${color}Darker);`;
                    case exports.TChipVariant.Outline: return `border-color: var(--lotus-color-${color}Darker);`;
                }
                break;
            case exports.TControlState.Selected:
            case exports.TControlState.Focus:
            case exports.TControlState.Disabled:
                switch (variant) {
                    case exports.TChipVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
                    case exports.TChipVariant.Outline: return `border-color: var(--lotus-color-${color});`;
                }
                break;
        }
        return '';
    }
    static getBackgroundColorProps(color, variant, state) {
        switch (state) {
            case exports.TControlState.Normal:
                {
                    switch (variant) {
                        case exports.TChipVariant.Filled: return `background-color: var(--lotus-color-${color}Palest);`;
                        case exports.TChipVariant.Outline: return `background-color: var(--lotus-color-${'light'});`;
                    }
                }
                break;
            case exports.TControlState.Hover:
                switch (variant) {
                    case exports.TChipVariant.Filled: return `background-color: var(--lotus-color-${color}Dark);`;
                    case exports.TChipVariant.Outline: return `background-color: var(--lotus-color-${color}Palest);`;
                }
                break;
            case exports.TControlState.Pressed:
                switch (variant) {
                    case exports.TChipVariant.Filled: return `background-color: var(--lotus-color-${color}Darker);`;
                    case exports.TChipVariant.Outline: return `background-color: var(--lotus-color-${color}Palest);`;
                }
                break;
            case exports.TControlState.Selected:
            case exports.TControlState.Focus:
            case exports.TControlState.Disabled:
                switch (variant) {
                    case exports.TChipVariant.Filled: return `background-color: var(--lotus-color-${color});`;
                    case exports.TChipVariant.Outline: return `background-color: var(--lotus-color-${'light'});`;
                }
                break;
        }
        return '';
    }
    static getColorProps(color, variant, state) {
        switch (state) {
            case exports.TControlState.Normal:
                {
                    switch (variant) {
                        case exports.TChipVariant.Filled: return `color: var(--lotus-color-${color});`;
                        case exports.TChipVariant.Outline: return `color: var(--lotus-color-${color});`;
                    }
                }
                break;
            case exports.TControlState.Hover:
                switch (variant) {
                    case exports.TChipVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
                    case exports.TChipVariant.Outline: return `color: var(--lotus-color-${color}Dark);`;
                }
                break;
            case exports.TControlState.Pressed:
                switch (variant) {
                    case exports.TChipVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
                    case exports.TChipVariant.Outline: return `color: var(--lotus-color-${color}Darker);`;
                }
                break;
            case exports.TControlState.Selected:
            case exports.TControlState.Focus:
            case exports.TControlState.Disabled:
                switch (variant) {
                    case exports.TChipVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
                    case exports.TChipVariant.Outline: return `color: var(--lotus-color-${color});`;
                }
                break;
        }
        return '';
    }
    static getPaddingSidesProps(size, paddingControl) {
        switch (size) {
            case exports.TControlSize.Smaller:
                {
                    switch (paddingControl) {
                        case exports.TControlPadding.Minimum: return 'padding: 0.08rem; font-size: x-small;';
                        case exports.TControlPadding.Normal: return 'padding: 0.1rem; font-size: x-small;';
                        case exports.TControlPadding.Enlarged: return 'padding: 0.15rem; font-size: x-small;';
                    }
                }
                break;
            case exports.TControlSize.Small:
                {
                    switch (paddingControl) {
                        case exports.TControlPadding.Minimum: return 'padding: 0.1rem; font-size: small;';
                        case exports.TControlPadding.Normal: return 'padding: 0.15rem; font-size: small;';
                        case exports.TControlPadding.Enlarged: return 'padding: 0.2rem; font-size: small;';
                    }
                }
                break;
            case exports.TControlSize.Medium:
                {
                    switch (paddingControl) {
                        case exports.TControlPadding.Minimum: return 'padding: 0.15rem; font-size: medium;';
                        case exports.TControlPadding.Normal: return 'padding: 0.2rem; font-size: medium;';
                        case exports.TControlPadding.Enlarged: return 'padding: 0.25rem; font-size: medium;';
                    }
                }
                break;
            case exports.TControlSize.Large:
                {
                    switch (paddingControl) {
                        case exports.TControlPadding.Minimum: return 'padding: 0.2rem; font-size: large;';
                        case exports.TControlPadding.Normal: return 'padding: 0.3rem; font-size: large;';
                        case exports.TControlPadding.Enlarged: return 'padding: 0.4rem; font-size: large;';
                    }
                }
                break;
        }
        return '';
    }
}

const Chip = ({ color = exports.TColorType.Secondary, size = exports.TControlSize.Medium, variant = exports.TChipVariant.Filled, paddingControl = exports.TControlPadding.Normal, label, ...propsSpan }) => {
    const chipMain = css.css `
  ${ThemeHelper.getFontFamilyPropsAsText()}
  border-width: var(--lotus-border-width);
  border-style: var(--lotus-border-style);
  border-radius: 0.2rem;
  ${ChipHelper.getBorderColorProps(color, variant, exports.TControlState.Normal)}
  ${ChipHelper.getColorProps(color, variant, exports.TControlState.Normal)}
  ${ChipHelper.getBackgroundColorProps(color, variant, exports.TControlState.Normal)}
  ${ChipHelper.getPaddingSidesProps(size, paddingControl)}
    &:hover {
      ${ChipHelper.getBorderColorProps(color, variant, exports.TControlState.Hover)}
      ${ChipHelper.getBackgroundColorProps(color, variant, exports.TControlState.Hover)}
      ${ChipHelper.getColorProps(color, variant, exports.TControlState.Hover)}
    }
    &:active {
      ${ChipHelper.getBorderColorProps(color, variant, exports.TControlState.Pressed)}
      ${ChipHelper.getBackgroundColorProps(color, variant, exports.TControlState.Pressed)}
      ${ChipHelper.getColorProps(color, variant, exports.TControlState.Pressed)}
    }
    &:disabled {
      ${ChipHelper.getBorderColorProps(color, variant, exports.TControlState.Disabled)}
      ${ChipHelper.getBackgroundColorProps(color, variant, exports.TControlState.Disabled)}
      ${ChipHelper.getColorProps(color, variant, exports.TControlState.Disabled)}
      ${ThemeHelper.getOpacityPropsForDisabledAsText()}
    }
`;
    const chipClass = css.cx(chipMain);
    return jsxRuntime.jsx("span", { ...propsSpan, className: chipClass, children: label });
};

/**
 * Вариант отображения текста
 */
exports.TTypographyVariant = void 0;
(function (TTypographyVariant) {
    /**
     * Заголовок 3 уровня
     */
    TTypographyVariant["Heading3"] = "h3";
    /**
     * Заголовок 4 уровня
     */
    TTypographyVariant["Heading4"] = "h4";
    /**
     * Заголовок 5 уровня
     */
    TTypographyVariant["Heading5"] = "h5";
    /**
     * Заголовок 6 уровня
     */
    TTypographyVariant["Heading6"] = "h6";
    /**
     * Подзаголовок 1 уровня
     */
    TTypographyVariant["TitleLarge"] = "large";
    /**
     * Подзаголовок 2 уровня
     */
    TTypographyVariant["TitleMedium"] = "medium";
    /**
     * Подзаголовок 3 уровня
     */
    TTypographyVariant["TitleSmall"] = "small";
    /**
     * Подзаголовок 4 уровня
     */
    TTypographyVariant["TitleSmaller"] = "smaller";
    /**
     * Основной текст вариант 1
     */
    TTypographyVariant["Body1"] = "body1";
    /**
     * Основной текст вариант 2
     */
    TTypographyVariant["Body2"] = "body2";
})(exports.TTypographyVariant || (exports.TTypographyVariant = {}));

const Typography = ({ color = undefined, variant = exports.TTypographyVariant.Body1, ...propsElem }) => {
    const typographyClass = css.cx(`lotus-typography-${variant}`, color && `lotus-foreground-${color}`);
    switch (variant) {
        case exports.TTypographyVariant.Heading3: return jsxRuntime.jsx("h3", { ...propsElem, className: typographyClass, children: propsElem.children });
        case exports.TTypographyVariant.Heading4: return jsxRuntime.jsx("h4", { ...propsElem, className: typographyClass, children: propsElem.children });
        case exports.TTypographyVariant.Heading5: return jsxRuntime.jsx("h5", { ...propsElem, className: typographyClass, children: propsElem.children });
        case exports.TTypographyVariant.Heading6: return jsxRuntime.jsx("h6", { ...propsElem, className: typographyClass, children: propsElem.children });
        case exports.TTypographyVariant.TitleLarge: return jsxRuntime.jsx("span", { ...propsElem, className: typographyClass, children: propsElem.children });
        case exports.TTypographyVariant.TitleMedium: return jsxRuntime.jsx("span", { ...propsElem, className: typographyClass, children: propsElem.children });
        case exports.TTypographyVariant.TitleSmall: return jsxRuntime.jsx("span", { ...propsElem, className: typographyClass, children: propsElem.children });
        case exports.TTypographyVariant.TitleSmaller: return jsxRuntime.jsx("span", { ...propsElem, className: typographyClass, children: propsElem.children });
        case exports.TTypographyVariant.Body1: return jsxRuntime.jsx("p", { ...propsElem, className: typographyClass, children: propsElem.children });
        case exports.TTypographyVariant.Body2: return jsxRuntime.jsx("p", { ...propsElem, className: typographyClass, children: propsElem.children });
    }
    return jsxRuntime.jsx(jsxRuntime.Fragment, {});
};

class TypographyHelper {
    /**
     * Получение оптимального варианта текста при указанном размере элемента UI
     * @param size Размере элемента UI
     * @returns Оптимальный варианта текста
     */
    static getTypographyVariantByControlSize(size) {
        if (size) {
            switch (size) {
                case exports.TControlSize.Smaller: return exports.TTypographyVariant.TitleSmaller;
                case exports.TControlSize.Small: return exports.TTypographyVariant.TitleSmall;
                case exports.TControlSize.Medium: return exports.TTypographyVariant.TitleMedium;
                case exports.TControlSize.Large: return exports.TTypographyVariant.TitleLarge;
            }
        }
        return exports.TTypographyVariant.TitleMedium;
    }
}

const Label = ({ label, color, variant = exports.TTypographyVariant.TitleMedium, isTopLabel, ...propsLabel }) => {
    if (label) {
        if (isTopLabel) {
            return (jsxRuntime.jsxs("div", { className: `lotus-label-container-v lotus-gap-v-${variant}`, children: [jsxRuntime.jsx(Typography, { color: color, variant: variant, ...propsLabel, children: label }), propsLabel.children] }));
        }
        else {
            return (jsxRuntime.jsxs("div", { className: `lotus-label-container-h lotus-gap-h-${variant}`, children: [jsxRuntime.jsx(Typography, { color: color, variant: variant, ...propsLabel, children: label }), propsLabel.children] }));
        }
    }
    else {
        return propsLabel.children;
    }
};

class InputFieldHelper {
    static getBorderColorProps(color, state) {
        switch (state) {
            case exports.TControlState.Normal:
                return `border-color: var(--lotus-color-${'border'});`;
            case exports.TControlState.Hover:
                return `border-color: var(--lotus-color-${color});`;
            case exports.TControlState.Pressed:
                return `border-color: var(--lotus-color-${color});`;
            case exports.TControlState.Selected:
            case exports.TControlState.Focus:
                return `border-color: var(--lotus-color-${color}); box-shadow: 0px 0px 0px 3px var(--lotus-shadow-${color});`;
            case exports.TControlState.Disabled:
                return `border-color: var(--lotus-color-${'border'});`;
        }
        return '';
    }
    static getBackgroundProps(color, isBackground) {
        if (isBackground && isBackground === true) {
            return `background-color: var(--lotus-color-${color}Palest);`;
        }
        return '';
    }
}

const InputField = ({ color = exports.TColorType.Primary, isBackground = false, size = exports.TControlSize.Medium, paddingControl = exports.TControlPadding.Normal, labelProps, ...propsInput }) => {
    const InputFieldMain = css.css `
    ${ThemeHelper.getFontFamilyPropsAsText()}
    ${ThemeHelper.getBorderPropsAsText()}
    ${ThemeHelper.getTransitionPropsAsText()}
    ${InputFieldHelper.getBackgroundProps(color, isBackground)}
    ${InputFieldHelper.getBorderColorProps(color, exports.TControlState.Normal)}
      &:hover {
        ${InputFieldHelper.getBorderColorProps(color, exports.TControlState.Hover)}
      }
      &:focus {
        ${InputFieldHelper.getBorderColorProps(color, exports.TControlState.Focus)}
        outline: 0;
      }
      &:disabled {
        ${InputFieldHelper.getBorderColorProps(color, exports.TControlState.Disabled)}
        ${ThemeHelper.getOpacityPropsForDisabledAsText()}
      }
  `;
    const InputFieldClass = css.cx(InputFieldMain, `lotus-size-${size}-${paddingControl}`);
    if (labelProps) {
        return jsxRuntime.jsx(Label, { ...labelProps, variant: labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size), children: jsxRuntime.jsx("input", { type: 'text', ...propsInput, className: InputFieldClass }) });
    }
    else {
        return jsxRuntime.jsx("input", { type: 'text', ...propsInput, className: InputFieldClass });
    }
};

class SelectHelper {
    static getGapFromSize(size) {
        switch (size) {
            case exports.TControlSize.Smaller: return 0.3;
            case exports.TControlSize.Small: return 0.35;
            case exports.TControlSize.Medium: return 0.5;
            case exports.TControlSize.Large: return 0.65;
        }
        return 0.5;
    }
    static getMainContainerHeightFromSize(size) {
        switch (size) {
            case exports.TControlSize.Smaller: return 22;
            case exports.TControlSize.Small: return 28;
            case exports.TControlSize.Medium: return 36;
            case exports.TControlSize.Large: return 44;
        }
        return 36;
    }
    static getBorderColorProps(color, isDisabled, isFocused) {
        if (isDisabled) {
            return { borderColor: 'var(--lotus-color-border)' };
        }
        else {
            if (isFocused) {
                return { borderColor: `var(--lotus-color-${color})` };
            }
            else {
                return { borderColor: 'var(--lotus-color-border)' };
            }
        }
    }
    static getBoxShadowProps(color, isDisabled, isFocused) {
        if (isDisabled) {
            return {};
        }
        else {
            if (isFocused) {
                return { boxShadow: `0px 0px 0px 3px var(--lotus-shadow-${color})` };
            }
            else {
                return {};
            }
        }
    }
    static getFlexContainer(size) {
        return {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: `${SelectHelper.getGapFromSize(size)}rem`
        };
    }
    static getMarginOffsetInput(size) {
        switch (size) {
            case exports.TControlSize.Smaller: return 14;
            case exports.TControlSize.Small: return 18;
            case exports.TControlSize.Medium: return 22;
            case exports.TControlSize.Large: return 24;
        }
        return 32;
    }
    static getMarginOffsetSingleValue(size) {
        switch (size) {
            case exports.TControlSize.Smaller: return -4;
            case exports.TControlSize.Small: return -4;
            case exports.TControlSize.Medium: return -4;
            case exports.TControlSize.Large: return -6;
        }
        return -4;
    }
    static getPaddingLeftOption(size) {
        switch (size) {
            case exports.TControlSize.Smaller: return 6;
            case exports.TControlSize.Small: return 8;
            case exports.TControlSize.Medium: return 10;
            case exports.TControlSize.Large: return 12;
        }
        return 12;
    }
}

const MultiSelect = ({ color = exports.TColorType.Primary, size = exports.TControlSize.Medium, isBackground = false, paddingControl = exports.TControlPadding.Normal, width, labelProps, hasIcons = false, options, onSetSelectedValues, initialSelectedValues, rightElement, ...propsReactSelect }) => {
    const [selectedOptions, setSelectedOptions] = React.useState(lotusCore.SelectOptionHelper.getSelectOptionsByValues(options, initialSelectedValues));
    const handleMultiSelect = (newValue, _actionMeta) => {
        if (newValue) {
            const values = newValue.map(x => x.value);
            setSelectedOptions(Array.from(newValue));
            if (onSetSelectedValues) {
                onSetSelectedValues(values);
            }
        }
        else {
            setSelectedOptions([]);
            if (onSetSelectedValues) {
                onSetSelectedValues([]);
            }
        }
    };
    const selectOptionStyles = {
        container: (base) => ({
            ...base,
            width: width,
            minHeight: hasIcons ? `${SelectHelper.getMainContainerHeightFromSize(size)}px` : base.minHeight
        }),
        control: (styles, state) => ({
            ...styles,
            minHeight: hasIcons ? `${SelectHelper.getMainContainerHeightFromSize(size)}px` : styles.minHeight,
            paddingTop: 0,
            paddingBottom: 0,
            ...ThemeHelper.getFontFamilyPropsAsCSS(),
            ...ThemeHelper.getFontSizeByControlSizeAsCSS(size),
            ...ThemeHelper.getTransitionPropsAsCSS(),
            ...ThemeHelper.getBorderPropsAsCSS(),
            ...SelectHelper.getBorderColorProps(color, state.isDisabled, state.isFocused),
            ...SelectHelper.getBoxShadowProps(color, state.isDisabled, state.isFocused),
            ':hover': {
                ...SelectHelper.getBorderColorProps(color, state.isDisabled, state.isFocused)
            },
            ':disabled': {
                ...ThemeHelper.getOpacityPropsForDisabledAsCSS()
            }
        }),
        dropdownIndicator: (base) => ({
            ...base,
            paddingTop: 0,
            paddingBottom: 0
        }),
        valueContainer: (base) => ({
            ...base,
            padding: '2px',
            paddingTop: 0,
            paddingBottom: 0
        }),
        clearIndicator: (base) => ({
            ...base,
            paddingTop: 0,
            paddingBottom: 0
        }),
        input: (base) => ({
            ...base,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            marginBottom: 0,
            padding: `var(--lotus-padding-${paddingControl}-${size})`
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                ...ThemeHelper.getFontFamilyPropsAsCSS(),
                ...ThemeHelper.getFontSizeByControlSizeAsCSS(size),
                ...ThemeHelper.getTransitionPropsAsCSS(),
                ...(hasIcons ? SelectHelper.getFlexContainer(size) : {}),
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? `var(--lotus-color-${color})`
                        : isFocused
                            ? `var(--lotus-color-${color}Light)`
                            : undefined,
                color: isDisabled
                    ? 'gray'
                    : isSelected
                        ? `var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)})`
                        : isFocused
                            ? `var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)})`
                            : 'black',
                cursor: isDisabled ? 'not-allowed' : 'default',
                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? 'inherit'
                            : `var(--lotus-color-${color}Dark)`
                        : undefined
                }
            };
        },
        multiValue: (styles, { data, isDisabled }) => {
            return {
                ...styles,
                backgroundColor: `var(--lotus-color-${color}Palest)`,
                borderColor: `var(--lotus-color-${color}Light)`,
                ...ThemeHelper.getBorderPropsAsCSS(),
                padding: hasIcons ? `var(--lotus-padding-${paddingControl}-${size})` : 1,
                marginLeft: '2px',
                ...ThemeHelper.getFontFamilyPropsAsCSS(),
                ...ThemeHelper.getFontSizeByControlSizeAsCSS(size),
                ...ThemeHelper.getTransitionPropsAsCSS(),
                ...(hasIcons ? SelectHelper.getFlexContainer(size) : {})
            };
        },
        multiValueRemove: (styles) => {
            return {
                ...styles,
                ':hover': {
                    backgroundColor: `var(--lotus-color-${color}Light)`
                }
            };
        },
        multiValueLabel: (styles) => {
            return {
                ...styles,
                padding: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '0.4rem'
            };
        }
    };
    const { Option, MultiValue } = ReactSelect.components;
    const RenderOption = (props) => {
        if (props.data.icon) {
            if (typeof props.data.icon === 'string') {
                const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
                return (jsxRuntime.jsxs(Option, { ...props, children: [jsxRuntime.jsx("img", { src: props.data.icon, width: sizeIcon, height: sizeIcon }), props.data.text] }));
            }
            else {
                return (jsxRuntime.jsxs(Option, { ...props, children: [jsxRuntime.jsx(reactIcons.IconContext.Provider, { value: { size: `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem` }, children: props.data.icon }), props.data.text] }));
            }
        }
        else {
            return (jsxRuntime.jsx(Option, { ...props, children: props.data.text }));
        }
    };
    const RenderMultiValue = (props) => {
        if (props.data.icon) {
            if (typeof props.data.icon === 'string') {
                const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
                return (jsxRuntime.jsxs(MultiValue, { ...props, children: [jsxRuntime.jsx("img", { src: props.data.icon, width: sizeIcon, height: sizeIcon }), props.data.text] }));
            }
            else {
                return (jsxRuntime.jsxs(MultiValue, { ...props, children: [jsxRuntime.jsx(reactIcons.IconContext.Provider, { value: { size: `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem`, style: { marginLeft: '-10x' } }, children: props.data.icon }), props.data.text] }));
            }
        }
        else {
            return (jsxRuntime.jsx(MultiValue, { ...props, children: props.data.text }));
        }
    };
    const RenderReactSelect = () => {
        return jsxRuntime.jsx(ReactSelect, { isMulti: true, ...propsReactSelect, options: options, value: selectedOptions, styles: selectOptionStyles, classNamePrefix: 'react-multiSelect', getOptionLabel: (MultiSelectOption) => MultiSelectOption.text, getOptionValue: (MultiSelectOption) => MultiSelectOption.value, 
            // @ts-expect-error handleMultiSelect
            onChange: handleMultiSelect, className: 'basic-multi-select', components: { Option: RenderOption, MultiValue: RenderMultiValue } });
    };
    if (labelProps) {
        return jsxRuntime.jsx(Label, { ...labelProps, variant: labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size), children: RenderReactSelect() });
    }
    else {
        return RenderReactSelect();
    }
};

const Select = ({ color = exports.TColorType.Primary, size = exports.TControlSize.Medium, isBackground = false, paddingControl = exports.TControlPadding.Normal, width, labelProps, hasIcons = false, options, onSetSelectedValue, initialSelectedValue, rightElement, ...propsReactSelect }) => {
    const [selectedOption, setSelectedOption] = React.useState(options.find(x => x.value === initialSelectedValue));
    const handleSelect = (newValue, _actionMeta) => {
        if (newValue) {
            setSelectedOption(newValue);
            if (onSetSelectedValue) {
                onSetSelectedValue(newValue.value);
            }
        }
        else {
            setSelectedOption(undefined);
            if (onSetSelectedValue) {
                onSetSelectedValue(undefined);
            }
        }
    };
    const selectOptionStyles = {
        container: (base) => ({
            ...base,
            width: width,
            minHeight: hasIcons ? `${SelectHelper.getMainContainerHeightFromSize(size)}px` : base.minHeight
        }),
        control: (styles, state) => ({
            ...styles,
            minHeight: hasIcons ? `${SelectHelper.getMainContainerHeightFromSize(size)}px` : styles.minHeight,
            paddingTop: 0,
            paddingBottom: 0,
            ...ThemeHelper.getFontFamilyPropsAsCSS(),
            ...ThemeHelper.getFontSizeByControlSizeAsCSS(size),
            ...ThemeHelper.getTransitionPropsAsCSS(),
            ...ThemeHelper.getBorderPropsAsCSS(),
            ...SelectHelper.getBorderColorProps(color, state.isDisabled, state.isFocused),
            ...SelectHelper.getBoxShadowProps(color, state.isDisabled, state.isFocused),
            ':hover': {
                ...SelectHelper.getBorderColorProps(color, state.isDisabled, state.isFocused)
            },
            ':disabled': {
                ...ThemeHelper.getOpacityPropsForDisabledAsCSS()
            }
        }),
        dropdownIndicator: (base) => ({
            ...base,
            paddingTop: 0,
            paddingBottom: 0
        }),
        valueContainer: (base) => ({
            ...base,
            paddingTop: 0,
            paddingBottom: 0
        }),
        clearIndicator: (base) => ({
            ...base,
            paddingTop: 0,
            paddingBottom: 0
        }),
        input: (base) => ({
            ...base,
            marginLeft: hasIcons ? `${SelectHelper.getMarginOffsetInput(size)}px` : 0,
            marginRight: 0,
            marginTop: 0,
            marginBottom: 0,
            padding: `var(--lotus-padding-${paddingControl}-${size})`
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                padding: `var(--lotus-padding-${paddingControl}-${size})`,
                paddingLeft: `${SelectHelper.getPaddingLeftOption(size)}px`,
                ...ThemeHelper.getFontFamilyPropsAsCSS(),
                ...ThemeHelper.getFontSizeByControlSizeAsCSS(size),
                ...ThemeHelper.getTransitionPropsAsCSS(),
                ...(hasIcons ? SelectHelper.getFlexContainer(size) : {}),
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? `var(--lotus-color-${color})`
                        : isFocused
                            ? `var(--lotus-color-${color}Light)`
                            : undefined,
                color: isDisabled
                    ? 'gray'
                    : isSelected
                        ? `var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)})`
                        : isFocused
                            ? `var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)})`
                            : 'black',
                cursor: isDisabled ? 'not-allowed' : 'default',
                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? 'inherit'
                            : `var(--lotus-color-${color}Dark)`
                        : undefined
                }
            };
        },
        singleValue: (styles, { data, isDisabled }) => {
            return {
                ...styles,
                padding: hasIcons ? `var(--lotus-padding-${paddingControl}-${size})` : 0,
                marginLeft: hasIcons ? `${SelectHelper.getMarginOffsetSingleValue(size)}px` : '2px',
                ...ThemeHelper.getFontFamilyPropsAsCSS(),
                ...ThemeHelper.getFontSizeByControlSizeAsCSS(size),
                ...ThemeHelper.getTransitionPropsAsCSS(),
                ...(hasIcons ? SelectHelper.getFlexContainer(size) : {})
            };
        }
    };
    const { Option, SingleValue } = ReactSelect.components;
    const RenderOption = (props) => {
        if (props.data.icon) {
            if (typeof props.data.icon === 'string') {
                const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
                return (jsxRuntime.jsxs(Option, { ...props, children: [jsxRuntime.jsx("img", { src: props.data.icon, width: sizeIcon, height: sizeIcon }), props.data.text] }));
            }
            else {
                return (jsxRuntime.jsxs(Option, { ...props, children: [jsxRuntime.jsx(reactIcons.IconContext.Provider, { value: { size: `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem` }, children: props.data.icon }), props.data.text] }));
            }
        }
        else {
            return (jsxRuntime.jsx(Option, { ...props, children: props.data.text }));
        }
    };
    const RenderSingleValue = (props) => {
        if (props.data.icon) {
            if (typeof props.data.icon === 'string') {
                const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
                return (jsxRuntime.jsxs(SingleValue, { ...props, children: [jsxRuntime.jsx("img", { src: props.data.icon, width: sizeIcon, height: sizeIcon }), props.data.text] }));
            }
            else {
                return (jsxRuntime.jsxs(SingleValue, { ...props, children: [jsxRuntime.jsx(reactIcons.IconContext.Provider, { value: { size: `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem`, style: { marginLeft: '-10x' } }, children: props.data.icon }), props.data.text] }));
            }
        }
        else {
            return (jsxRuntime.jsx(SingleValue, { ...props, children: props.data.text }));
        }
    };
    const RenderReactSelect = () => {
        return jsxRuntime.jsx(ReactSelect, { ...propsReactSelect, options: options, value: selectedOption, styles: selectOptionStyles, classNamePrefix: 'react-select', getOptionLabel: (selectOption) => selectOption.text, getOptionValue: (selectOption) => selectOption.value, 
            // @ts-expect-error onChange
            onChange: handleSelect, components: { Option: RenderOption, SingleValue: RenderSingleValue } });
    };
    if (labelProps) {
        return jsxRuntime.jsx(Label, { ...labelProps, variant: labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size), children: RenderReactSelect() });
    }
    else {
        return RenderReactSelect();
    }
};

const Dialog = React.forwardRef(function Dialog({ label, footer, children }, ref) {
    const dialogRef = React.useRef(null);
    React.useImperativeHandle(ref, () => {
        return {
            get isOpen() {
                return dialogRef?.current?.open;
            },
            get getReturnValue() {
                return dialogRef?.current?.returnValue;
            },
            show() {
                dialogRef?.current?.show();
            },
            showModal() {
                dialogRef?.current?.showModal();
            },
            close(returnValue) {
                dialogRef?.current?.close(returnValue);
            }
        };
    }, []);
    const handleButtonCloseClick = () => {
        dialogRef?.current?.close();
    };
    const dialogClass = css.cx('lotus-dialog');
    return (jsxRuntime.jsx("dialog", { ref: dialogRef, className: dialogClass, children: jsxRuntime.jsxs("div", { className: 'lotus-dialog-main', children: [jsxRuntime.jsxs("div", { className: 'lotus-dialog-header', children: [label && (jsxRuntime.jsx("div", { className: 'lotus-dialog-header-text', children: label })), jsxRuntime.jsx("button", { onClick: handleButtonCloseClick, className: 'lotus-dialog-header-button', children: " \u2715 " })] }), jsxRuntime.jsx("div", { className: 'lotus-dialog-body', children: children }), jsxRuntime.jsxs("div", { className: 'lotus-dialog-footer', children: [footer, jsxRuntime.jsx(Button, { value: '\u041E\u043A', variant: exports.TButtonVariant.Outline, children: "\u041E\u043A" }), jsxRuntime.jsx(Button, { onClick: handleButtonCloseClick, value: 'Cancel', variant: exports.TButtonVariant.Outline, children: "Cancel" })] })] }) }));
});

const ToastWrapper = (props) => {
    return jsxRuntime.jsx(reactToastify.ToastContainer, { ...props });
};

const ToastErrorPanel = ({ title, error }) => {
    const result = lotusCore.instanceOfResult(error);
    if (result) {
        return jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("p", { style: { fontSize: '0.9em' }, children: title }), jsxRuntime.jsxs("p", { style: { fontSize: '0.8em' }, children: ["Code: ", result.code] }), jsxRuntime.jsxs("p", { style: { fontSize: '0.8em' }, children: ["Message: ", result.message] }), result.data && jsxRuntime.jsxs("p", { style: { fontSize: '0.8em' }, children: ["Data: ", result.data] })] });
    }
    else {
        const authError = (error['error'] && error['error_description']);
        if (authError) {
            return jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("p", { style: { fontSize: '0.9em' }, children: title }), jsxRuntime.jsxs("p", { style: { fontSize: '0.8em' }, children: ["Error: ", error['error']] }), jsxRuntime.jsxs("p", { style: { fontSize: '0.8em' }, children: ["Message: ", error['error_description']] })] });
        }
        else {
            return jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("span", { style: { fontSize: '0.9em' }, children: title }), jsxRuntime.jsx("br", {}), jsxRuntime.jsxs("span", { style: { fontSize: '0.8em' }, children: ["Error: ", error.toString()] }), jsxRuntime.jsx("br", {})] });
        }
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toastError = (error, title) => {
    return reactToastify.toast.error(jsxRuntime.jsx(ToastErrorPanel, { error: error, title: title }));
};

const toastPromise = (promise, textPending, textSuccess, textFailed, options) => {
    return reactToastify.toast.promise(promise, {
        pending: textPending,
        success: textSuccess,
        error: {
            render({ data }) {
                return jsxRuntime.jsx(ToastErrorPanel, { error: data, title: textFailed });
            }
        }
    }, options);
};

const AppMainLayout = ({ page }) => {
    const layoutState = useLayoutState();
    if (layoutState.screenType != exports.TScreenType.Landscape) {
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(AppHeader, {}), jsxRuntime.jsx(AppLeftPanel, {}), page, jsxRuntime.jsx(AppFooter, {})] }));
    }
    else {
        return (jsxRuntime.jsxs(HorizontalStack, { children: [jsxRuntime.jsx(AppLeftPanel, {}), page] }));
    }
};

class MaterialReactTableHelper {
    static getDefaultFilterFunction(property) {
        switch (property.propertyType) {
            case lotusCore.PropertyTypeEnum.String: return 'contains';
            case lotusCore.PropertyTypeEnum.Enum: return 'arrIncludesSome';
        }
        return 'equals';
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static convertPropertyDescriptorToColumn(property) {
        const column = {
            accessorKey: property.fieldName,
            header: property.name,
            // Фильтрация
            enableColumnFilter: (property.filtering && property.filtering.enabled) ?? false,
            filterVariant: property.filtering && property.filtering.variant,
            filterFn: MaterialReactTableHelper.getDefaultFilterFunction(property),
            filterSelectOptions: property.options,
            // Сортировка
            enableSorting: (property.sorting && property.sorting.enabled) ?? false,
            // Редактирование
            enableEditing: (property.editing && property.editing.enabled) ?? false
        };
        return column;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static convertObjectInfoToColumns(objectInfo) {
        const properties = objectInfo.getProperties();
        const columns = properties.map((x) => {
            const column = MaterialReactTableHelper.convertPropertyDescriptorToColumn(x);
            return column;
        });
        return columns;
    }
    static convertColumnsFilterToFilterObjects(objectInfo, columnFilters, columnFiltersFns) {
        const properties = objectInfo.getProperties();
        const filteringAll = columnFilters.map((column) => {
            const filter = {
                propertyName: '',
                propertyType: lotusCore.PropertyTypeEnum.Boolean,
                function: lotusCore.FilterFunctionEnum.Equals,
                value: ''
            };
            const property = properties.find((x) => x.fieldName === column.id);
            if (property?.filtering && property?.filtering.enabled && columnFiltersFns) {
                const filterFn = columnFiltersFns[column.id];
                filter.propertyName = lotusCore.StringHelper.capitalizeFirstLetter(column.id);
                filter.propertyType = property.propertyType;
                filter.function = MaterialReactTableHelper.convertToFilterFunctionDesc(filterFn);
                if (filter.function === lotusCore.FilterFunctionEnum.IncludeAll ||
                    filter.function === lotusCore.FilterFunctionEnum.IncludeAny ||
                    filter.function === lotusCore.FilterFunctionEnum.IncludeEquals ||
                    filter.function === lotusCore.FilterFunctionEnum.IncludeNone) {
                    filter.values = column.value;
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    filter.value = column.value.toString();
                }
                filter.function = MaterialReactTableHelper.convertToFilterFunctionDesc(filterFn);
            }
            return filter;
        });
        const filtering = filteringAll.filter((x) => x.propertyName !== '');
        return filtering;
    }
    static convertToFilterFunctionDesc(filterFn) {
        switch (filterFn) {
            case 'equals': return lotusCore.FilterFunctionEnum.Equals;
            case 'equalsString': return lotusCore.FilterFunctionEnum.Equals;
            case 'notEquals': return lotusCore.FilterFunctionEnum.NotEqual;
            case 'lessThan': return lotusCore.FilterFunctionEnum.LessThan;
            case 'greaterThan': return lotusCore.FilterFunctionEnum.GreaterThan;
            case 'greaterThanOrEqualTo': return lotusCore.FilterFunctionEnum.LessThanOrEqual;
            case 'between': return lotusCore.FilterFunctionEnum.Between;
            case 'betweenInclusive': return lotusCore.FilterFunctionEnum.Between;
            case 'contains': return lotusCore.FilterFunctionEnum.Contains;
            case 'startsWith': return lotusCore.FilterFunctionEnum.StartsWith;
            case 'endsWith': return lotusCore.FilterFunctionEnum.EndsWith;
            case 'notEmpty': return lotusCore.FilterFunctionEnum.NotEmpty;
            case 'includeAny': return lotusCore.FilterFunctionEnum.IncludeAny;
            case 'includeAll': return lotusCore.FilterFunctionEnum.IncludeAll;
            case 'includeEquals': return lotusCore.FilterFunctionEnum.IncludeEquals;
            case 'includeNone': return lotusCore.FilterFunctionEnum.IncludeNone;
            default: return lotusCore.FilterFunctionEnum.Equals;
        }
    }
    static convertFromFilterFunctionDesc(filterFn) {
        switch (filterFn) {
            case lotusCore.FilterFunctionEnum.Equals: return 'equals';
            case lotusCore.FilterFunctionEnum.NotEqual: return 'notEquals';
            case lotusCore.FilterFunctionEnum.LessThan: return 'lessThan';
            case lotusCore.FilterFunctionEnum.LessThanOrEqual: return 'lessThanOrEqualTo';
            case lotusCore.FilterFunctionEnum.GreaterThan: return 'greaterThan';
            case lotusCore.FilterFunctionEnum.GreaterThanOrEqual: return 'greaterThanOrEqualTo';
            case lotusCore.FilterFunctionEnum.Between: return 'between';
            case lotusCore.FilterFunctionEnum.Contains: return 'contains';
            case lotusCore.FilterFunctionEnum.StartsWith: return 'startsWith';
            case lotusCore.FilterFunctionEnum.EndsWith: return 'endsWith';
            case lotusCore.FilterFunctionEnum.NotEmpty: return 'notEmpty';
            case lotusCore.FilterFunctionEnum.IncludeAny: return 'includeAny';
            case lotusCore.FilterFunctionEnum.IncludeAll: return 'includeAll';
            case lotusCore.FilterFunctionEnum.IncludeEquals: return 'includeEquals';
            case lotusCore.FilterFunctionEnum.IncludeNone: return 'includeNone';
            default: return 'equals';
        }
    }
    /**
     * Получение списка функций фильтрации для свойств
     */
    static getFilterOptions(objectInfo) {
        const filterFunctions = {};
        objectInfo.getProperties().forEach((x) => {
            if (x.filtering && x.filtering.enabled) {
                filterFunctions[`${x.fieldName}`] = MaterialReactTableHelper.convertFromFilterFunctionDesc(x.filtering.functionDefault);
            }
        });
        return filterFunctions;
    }
}

class ReduxToolkitHelper {
    static getErrorText(value) {
        const newChar = '\n';
        return `code = ${value.code}${newChar}name = ${value.name}${newChar}message = ${value.message}`;
    }
}

const useForm = (defaultValues) => (handler) => async (event) => {
    event.preventDefault();
    event.persist();
    const form = event.target;
    const elements = Array.from(form.elements);
    const data = elements
        .filter((element) => element.hasAttribute('name'))
        .reduce((object, element) => ({
        ...object,
        [`${element.getAttribute('name')}`]: element.value
    }), defaultValues);
    await handler(data);
    form.reset();
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const useInterval = (callback, delay) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const savedCallback = React.useRef();
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    // eslint-disable-next-line consistent-return
    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = (...args) => savedCallback.current?.(...args);
        if (delay !== null) {
            const id = setInterval(handler, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

const useMediaQuery = (mediaQuery) => {
    const isSsr = typeof window === 'undefined';
    const [matches, setMatches] = React.useState(() => isSsr ? false : window.matchMedia(mediaQuery).matches);
    React.useLayoutEffect(() => {
        if (isSsr) {
            return;
        }
        const mediaQueryList = window.matchMedia(mediaQuery);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const listener = (e) => setMatches(e.matches);
        mediaQueryList.addEventListener('resize', listener);
        mediaQueryList.addEventListener('orientationchange', listener);
        // eslint-disable-next-line consistent-return
        return () => {
            mediaQueryList.removeEventListener('resize', listener);
            mediaQueryList.removeEventListener('orientationchange', listener);
        };
    }, [mediaQuery]);
    return matches;
};

/**
 * Хук для вызова функции в случае изменения размера или ориентации экрана
 * @param callback Вызываемая функция
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const useScreenResizeOrOrientation = (callback) => {
    const handleScreenResizeOrOrientation = () => {
        callback();
    };
    React.useLayoutEffect(() => {
        window.addEventListener('resize', handleScreenResizeOrOrientation);
        window.addEventListener('orientationchange', handleScreenResizeOrOrientation);
        callback();
        return () => {
            window.removeEventListener('resize', handleScreenResizeOrOrientation);
            window.removeEventListener('orientationchange', handleScreenResizeOrOrientation);
        };
    }, []);
};

const useFeedbackState = () => {
    return useAppSelectorCore((state) => state.feedback);
};

const SelectFilterFunction = (props) => {
    const { initialFunctionFn, onSelectFilterFunction, groupFilterFunctions } = props;
    const [selectedValue, setSelectedValue] = React.useState(initialFunctionFn?.name ?? groupFilterFunctions[0].name);
    const handleSelectFilterFunction = (filterFn) => {
        setSelectedValue(filterFn.name);
        onSelectFilterFunction(filterFn);
    };
    return jsxRuntime.jsx(material.Select, { value: selectedValue, renderValue: (selected) => { return lotusCore.FilterFunctionHelper.getDescByName(selected).desc; }, children: groupFilterFunctions.map((option) => (jsxRuntime.jsx(material.MenuItem, { value: option.name, onClick: () => { handleSelectFilterFunction(option); }, children: (option.desc) }, option.id))) });
};

exports.AppFooter = AppFooter;
exports.AppHeader = AppHeader;
exports.AppLeftPanel = AppLeftPanel;
exports.AppMainLayout = AppMainLayout;
exports.Button = Button;
exports.ButtonHelper = ButtonHelper;
exports.Chip = Chip;
exports.ChipHelper = ChipHelper;
exports.CssTypesHelper = CssTypesHelper;
exports.Dialog = Dialog;
exports.Grid = Grid;
exports.HorizontalStack = HorizontalStack;
exports.InputField = InputField;
exports.InputFieldHelper = InputFieldHelper;
exports.Label = Label;
exports.LayoutHelper = LayoutHelper;
exports.MaterialReactTableHelper = MaterialReactTableHelper;
exports.MultiSelect = MultiSelect;
exports.ReduxToolkitHelper = ReduxToolkitHelper;
exports.Select = Select;
exports.SelectFilterFunction = SelectFilterFunction;
exports.SelectHelper = SelectHelper;
exports.ThemeConstants = ThemeConstants;
exports.ThemeHelper = ThemeHelper;
exports.ThemeProvider = ThemeProvider;
exports.ToastErrorPanel = ToastErrorPanel;
exports.ToastWrapper = ToastWrapper;
exports.Typography = Typography;
exports.TypographyHelper = TypographyHelper;
exports.VerticalStack = VerticalStack;
exports.ViewSettingsConstants = ViewSettingsConstants;
exports.addCommandLeftPanelLayoutAction = addCommandLeftPanelLayoutAction;
exports.collapseFooterLayoutAction = collapseFooterLayoutAction;
exports.feedbackSlice = feedbackSlice;
exports.hideAlertFeedbackAction = hideAlertFeedbackAction;
exports.makeStoreCore = makeStoreCore;
exports.openLeftPanelLayoutAction = openLeftPanelLayoutAction;
exports.removeCommandLeftPanelLayoutAction = removeCommandLeftPanelLayoutAction;
exports.setCommandsLeftPanelLayoutAction = setCommandsLeftPanelLayoutAction;
exports.showAlertFeedbackAction = showAlertFeedbackAction;
exports.showFooterLayoutAction = showFooterLayoutAction;
exports.showFooterUserLayoutAction = showFooterUserLayoutAction;
exports.showHeaderLayoutAction = showHeaderLayoutAction;
exports.showHeaderUserLayoutAction = showHeaderUserLayoutAction;
exports.showLeftPanelLayoutAction = showLeftPanelLayoutAction;
exports.storeCore = storeCore;
exports.toastError = toastError;
exports.toastPromise = toastPromise;
exports.useActualGraphicsSize = useActualGraphicsSize;
exports.useAppDispatchCore = useAppDispatchCore;
exports.useAppSelectorCore = useAppSelectorCore;
exports.useFeedbackState = useFeedbackState;
exports.useForm = useForm;
exports.useInterval = useInterval;
exports.useLayoutState = useLayoutState;
exports.useMediaQuery = useMediaQuery;
exports.useScreenResizeOrOrientation = useScreenResizeOrOrientation;
exports.useScreenTypeChanged = useScreenTypeChanged;
exports.useThemeSelector = useThemeSelector;
