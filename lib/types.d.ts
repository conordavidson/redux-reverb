import { Dispatch, Action } from 'redux';
export declare type SideEffect = <State>(action: Action<any>, previousState: State, currentState: State, dispatch: Dispatch) => void;
