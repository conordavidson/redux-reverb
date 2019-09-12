# Example

### `index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import sideEffectCreator from 'redux-reverb';
import rootSideEffect from 'sideEffects';
import reducers from 'state';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sideEffectMiddleware = sideEffectCreator(rootSideEffect);

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, promise, sideEffectMiddleware)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

### `sideEffects/index.js`

```js
import throttle from 'lodash/throttle';
import { SideEffect } from 'redux-reverb/lib/types';

const rootSideEffect: SideEffect = (action, previousState, currentState, dispatch) => {
  notificationSideEffect(action, previousState, currentState, dispatch);
  observeFirstName(action, previousState, currentState, dispatch);
};
export default rootSideEffect;

const notificationSideEffect: SideEffect = (action, previousState, currentState, dispatch) => {
  if (action.type === 'SET_FIRST_NAME_FULFILLED') dispatchNotification('First name successfully set', dispatch);
};

const dispatchNotification = (notificationText, dispatch) => {
  dispatch({
    type: 'PUSH_NOTIFICATION',
    payload: notificationText,
  });
  setTimeout(() => {
    dispatch({
      type: 'POP_NOTIFICATION',
    });
  }, 3000);
};

const throttledDispatchNotification = throttle((notificationText, dispatch) => {
  dispatch({
    type: 'PUSH_NOTIFICATION',
    payload: notificationText,
  });
  setTimeout(() => {
    dispatch({
      type: 'POP_NOTIFICATION',
    });
  }, 3000);
}, 2000);

const observeFirstName: SideEffect = (action, previousState, currentState, dispatch) => {
  if (previousState.user.firstName === null && currentState.user.firstName !== null) {
    console.log('user field was populated');
  }
};
```
