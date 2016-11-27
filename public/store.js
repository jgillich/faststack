import {createStore, applyMiddleware, compose} from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import {routerMiddleware } from "react-router-redux";
import {browserHistory} from "react-router";
import rootReducer from "./reducers/root";

export default function () {

  const applyMiddlewares = applyMiddleware(
    thunkMiddleware,
    routerMiddleware(browserHistory),
    (createLogger)()
  );

  const createStoreWithMiddleware = compose(
    applyMiddlewares,
  )(createStore);

  return createStoreWithMiddleware(
    rootReducer
  );
};
