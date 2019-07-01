const sideEffectCreator = rootSideEffect => store => next => action => {
  const previousState = store.getState();
  next(action);
  const currentState = store.getState();
  return rootSideEffect(action, previousState, currentState, store.dispatch);
};

export default sideEffectCreator;
