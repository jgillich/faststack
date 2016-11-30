import {createStore, applyMiddleware, compose} from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/root";

export default function () {

  const applyMiddlewares = applyMiddleware(
    thunkMiddleware,
    (createLogger)()
  );

  const createStoreWithMiddleware = compose(
    applyMiddlewares,
  )(createStore);

  return createStoreWithMiddleware(
    rootReducer
  );
};
