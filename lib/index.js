"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sideEffectCreator = function (rootSideEffect) {
    var createMiddleware = function (store) { return function (next) { return function (action) {
        var previousState = store.getState();
        var returnValue = next(action);
        var currentState = store.getState();
        rootSideEffect(action, previousState, currentState, store.dispatch);
        return returnValue;
    }; }; };
    return createMiddleware;
};
exports.default = sideEffectCreator;
//# sourceMappingURL=index.js.map