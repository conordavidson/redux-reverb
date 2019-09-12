import { Dispatch, Action } from 'redux';

export type SideEffect = <State>(
  action: Action<any>,
  previousState: State,
  currentState: State,
  dispatch: Dispatch,
) => void;
