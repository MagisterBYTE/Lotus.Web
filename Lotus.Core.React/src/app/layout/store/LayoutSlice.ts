import { createSlice } from '@reduxjs/toolkit';
import { TScreenType } from '../domain/ScreenType';
import { LayoutHelper } from '../helpers';
import { ViewSettingsConstants } from '../constants';
import { ILayoutState } from './LayoutState';
import
{
  setScreenTypeAction, showHeaderLayoutAction,
  showLeftPanelLayoutAction,
  openLeftPanelLayoutAction,
  showRightPanelLayoutAction,
  setWidthLeftPanelLayoutAction,
  showFooterLayoutAction,
  collapseFooterLayoutAction,
  showHeaderUserLayoutAction,
  showFooterUserLayoutAction,
  addCommandLeftPanelLayoutAction,
  removeCommandLeftPanelLayoutAction,
  setCommandsLeftPanelLayoutAction
} from './LayoutActions';

const initialState: ILayoutState = LayoutHelper.loadFromStorage();

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => 
  {
    //
    // В целом для сайта
    //       
    builder.addCase(setScreenTypeAction, (state, action) => 
    {
      state.screenType = action.payload;
      switch (action.payload)
      {
        case TScreenType.Desktop:
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
          } break;
        case TScreenType.Landscape:
          {
            state.header.isVisible = false;

            state.leftPanel.maxWidth = ViewSettingsConstants.Landscape.leftPanelWidthMax;
            state.leftPanel.minWidth = ViewSettingsConstants.Landscape.leftPanelWidthMin;
            state.leftPanel.width = ViewSettingsConstants.Landscape.leftPanelWidthMin;
            state.rightPanel.maxWidth = ViewSettingsConstants.Landscape.rightPanelWidthMax;
            state.rightPanel.minWidth = ViewSettingsConstants.Landscape.rightPanelWidthMin;
            state.rightPanel.width = ViewSettingsConstants.Landscape.rightPanelWidthMin;

            state.footer.isVisible = false;
          } break;
        case TScreenType.Portrait:
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
          } break;
      }

      LayoutHelper.saveToStorage(state);
    });

    //
    // Шапка
    //    
    builder.addCase(showHeaderLayoutAction, (state, action) => 
    {
      state.header.isVisible = action.payload;
      LayoutHelper.saveToStorage(state);
    });
    builder.addCase(showHeaderUserLayoutAction, (state, action) => 
    {
      state.header.isVisibleUser = action.payload;
      LayoutHelper.saveToStorage(state);
    });

    //
    // Левая панель
    //      
    builder.addCase(showLeftPanelLayoutAction, (state, action) => 
    {
      state.leftPanel.isVisible = action.payload;
      LayoutHelper.saveToStorage(state);
    });

    builder.addCase(openLeftPanelLayoutAction, (state, action) => 
    {
      state.leftPanel.isOpen = action.payload;
      if (action.payload)
      {
        state.leftPanel.width = state.leftPanel.maxWidth;
      }
      else
      {
        state.leftPanel.width = state.leftPanel.minWidth;
      }
      LayoutHelper.saveToStorage(state);
    });
    builder.addCase(setWidthLeftPanelLayoutAction, (state, action) => 
    {
      state.leftPanel.width = action.payload;
      LayoutHelper.saveToStorage(state);
    });
    builder.addCase(addCommandLeftPanelLayoutAction, (state, action) => 
    {
      if (state.leftPanelCommands)
      {
        if (state.leftPanelCommands.includes(action.payload) === false)
        {
          state.leftPanelCommands.push(action.payload);
        }
      }
      else
      {
        state.leftPanelCommands = [action.payload];
      }
      LayoutHelper.saveToStorage(state);
    });
    builder.addCase(removeCommandLeftPanelLayoutAction, (state, action) => 
    {
      if (state.leftPanelCommands)
      {
        state.leftPanelCommands = state.leftPanelCommands.filter(x => x !== action.payload);
      }
      LayoutHelper.saveToStorage(state);
    });
    builder.addCase(setCommandsLeftPanelLayoutAction, (state, action) => 
    {
      state.leftPanelCommands = [...action.payload];
      LayoutHelper.saveToStorage(state);
    });

    //
    // Правая панель
    //    
    builder.addCase(showRightPanelLayoutAction, (state, action) => 
    {
      state.rightPanel.isVisible = action.payload;
      LayoutHelper.saveToStorage(state);
    });

    //
    // Подвал
    //
    builder.addCase(showFooterLayoutAction, (state, action) => 
    {
      state.footer.isVisible = action.payload;
      LayoutHelper.saveToStorage(state);
    });
    builder.addCase(showFooterUserLayoutAction, (state, action) => 
    {
      state.footer.isVisibleUser = action.payload;
      LayoutHelper.saveToStorage(state);
    });
    builder.addCase(collapseFooterLayoutAction, (state, action) => 
    {
      state.footer.isCollapsed = action.payload;
      LayoutHelper.saveToStorage(state);
    });
  }
});