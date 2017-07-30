import { combineReducers } from 'redux';
import login from './login';
import rabbitmq from './rabbitmq';
export default combineReducers({
  login,
  rabbitmq,
});
