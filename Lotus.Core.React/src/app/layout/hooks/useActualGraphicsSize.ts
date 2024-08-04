import { useLayoutEffect, useState } from 'react';
import { IRectOffset, IRectSizeOffset } from 'lotus-core';
import { CssTypesHelper } from 'ui/helpers';
import { useLayoutState } from '../store/LayoutSelector';
import { TScreenType } from '../domain/ScreenType';
import { LayoutHelper } from '../helpers/LayoutHelper';

const defaultRectOffset: IRectOffset = { left: 1, top: 1, right: 1, bottom: 1 }

export const useActualGraphicsSize = (margin: IRectOffset = defaultRectOffset): IRectSizeOffset =>
{
  const marginLeftDefault = margin.left;
  const marginTopDefault = margin.top;
  const marginRightDefault = margin.right;
  const marginBottomDefault = margin.bottom;

  const layoutState = useLayoutState();

  const calcHeight = (): number =>
  {
    const graphicsHeight = LayoutHelper.getClientHeight(marginTopDefault + marginBottomDefault);
    return graphicsHeight;
  }

  const calcWidth = (): number =>
  {
    let graphicsWidth = window.innerWidth - marginLeftDefault - marginRightDefault;

    if (layoutState.screenType === TScreenType.Landscape)
    {
      graphicsWidth -= CssTypesHelper.toPixelWidth(layoutState.leftPanel.minWidth);
    }

    return graphicsWidth;
  }

  const calcMarginTop = (): number =>
  {
    if (layoutState.screenType !== TScreenType.Landscape)
    {
      return (marginTopDefault + CssTypesHelper.toPixelHeight(layoutState.header.height));
    }

    return marginTopDefault;
  }

  const [width, setWidth] = useState(calcWidth());
  const [height, setHeight] = useState(calcHeight());
  const [marginTop, setMarginTop] = useState(calcMarginTop());

  const handleScreenResizeOrOrientation = () =>
  {
    setHeight(calcHeight());

    setWidth(calcWidth());

    setMarginTop(calcMarginTop());
  }

  useLayoutEffect(() => 
  {
    window.addEventListener('resize', handleScreenResizeOrOrientation);
    window.addEventListener('orientationchange', handleScreenResizeOrOrientation);

    handleScreenResizeOrOrientation();

    return () => 
    {
      window.removeEventListener('resize', handleScreenResizeOrOrientation);
      window.removeEventListener('orientationchange', handleScreenResizeOrOrientation);
    };
  }, [])

  return { 
    left: marginLeftDefault, 
    right: marginRightDefault, 
    top: marginTop, 
    bottom: marginBottomDefault, 
    width: width, 
    height: height };
}