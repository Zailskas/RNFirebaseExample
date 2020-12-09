import {itemReducer} from './itemReducer';
import {isLoggedINReducer, authReducer} from './authReducer';
import {combineReducers} from 'redux';
import {messageErrorReducer} from './messageErrorReducer';

//kuriamas pagrindinis reduceris kuris turi visus reducerius
export default combineReducers({
  items: itemReducer,
  isLogged: isLoggedINReducer,
  auth: authReducer,
  messageError: messageErrorReducer,
});
