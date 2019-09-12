import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';
import { SideEffect } from './types';

const sideEffectCreator = (rootSideEffect: SideEffect) => {
  const createMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => <A extends Action>(
    action: A,
  ): Action<any> => {
    const previousState = store.getState();
    const returnValue = next(action);
    const currentState = store.getState();
    rootSideEffect(action, previousState, currentState, store.dispatch);
    return returnValue;
  };
  return createMiddleware;
};

export default sideEffectCreator;
