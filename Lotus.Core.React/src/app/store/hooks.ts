import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { AppDispatchCore, RootStateCore } from './store';

export const useAppDispatchCore = () => useDispatch<AppDispatchCore>();

export const useAppSelectorCore: TypedUseSelectorHook<RootStateCore> = useSelector;