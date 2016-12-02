import {combineReducers} from 'redux';
import boxReducer from './box'
import errorReducer from './error'

const rootReducer = combineReducers({
  box: boxReducer,
  errors: errorReducer
});

export default rootReducer;
