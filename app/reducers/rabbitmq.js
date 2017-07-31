import {
  Action
} from '../actions/types';
import {
  RABBITMQ_CONNECT_ATTEMPT,
  RABBITMQ_CONNECT_SUCCESS,
  RABBITMQ_CONNECT_FAILED,
  RABBITMQ_ON_MESSAGE,
  RABBITMQ_ON_MESSAGES
}
from '../actions/rabbitmq';
import {
  AsyncStorage
} from 'react-native';

const initialState = {
  isConnected: false,
  deviceInfo: {},
  publicQueueName: '',
  publicExchangeName: '',
  publicMessages: [],
  publicRoutingKey: ''
};

export default function(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case RABBITMQ_CONNECT_ATTEMPT:
      return Object.assign({}, state, {
        isConnected: false
      });
    case RABBITMQ_CONNECT_SUCCESS:
      return Object.assign({}, state, {
        isConnected: true,
        deviceInfo: action.payload.deviceInfo
      });
    case RABBITMQ_CONNECT_FAILED:
      return Object.assign({}, state, {
        isConnected: false,
        deviceInfo: action.payload.deviceInfo
      });
    case RABBITMQ_ON_MESSAGE:
      var messages = state.publicMessages;
      messages.push(action.payload.message);
      return Object.assign({}, state, {
        publicMessages: messages
      });
    case RABBITMQ_ON_MESSAGES:
      return Object.assign({}, state, {

      });
    default:
      return state;
  }
}
