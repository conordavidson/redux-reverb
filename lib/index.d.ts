import { Middleware, Dispatch } from 'redux';
import { SideEffect } from './types';
declare const sideEffectCreator: (rootSideEffect: SideEffect) => Middleware<{}, any, Dispatch<import("redux").AnyAction>>;
export default sideEffectCreator;
