import {combineReducers} from 'redux'
import boxReducer from './box'

const rootReducer = combineReducers({
  box: boxReducer,
})

export default rootReducer
