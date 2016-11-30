import {combineReducers} from "redux";

const rootReducer = combineReducers({
  shutUpRedux: (s) => s || {}
});

export default rootReducer;
