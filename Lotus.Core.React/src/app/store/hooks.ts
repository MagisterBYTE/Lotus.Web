import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { AppDispatchCore, RootStateCore } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatchCore = () => useDispatch<AppDispatchCore>();

export const useAppSelectorCore: TypedUseSelectorHook<RootStateCore> = useSelector;