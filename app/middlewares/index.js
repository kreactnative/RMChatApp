import * as actions from '../actions/rabbitmq';
import {
  Connection,
  Exchange,
  Queue
} from 'react-native-rabbitmq';

import DeviceInfo from 'react-native-device-info';
let device={
  uniqueID: DeviceInfo.getUniqueID(),
  manufacturer: DeviceInfo.getManufacturer(),
  model: DeviceInfo.getModel(),
  systemName: DeviceInfo.getSystemName(),
  systemVersion: DeviceInfo.getSystemVersion(),
  bundleId: DeviceInfo.getBundleId(),
  buildNumber: DeviceInfo.getBuildNumber(),
  version: DeviceInfo.getVersion(),
  readableVersion: DeviceInfo.getReadableVersion(),
};
console.log("Device Info", device);

// 128.199.250.80
const config = {
  host: '128.199.250.80',
  port: 5672,
  username: 'admin',
  password: '56255625',
  virtualhost: '/'
};

let connection = new Connection(config);
let queue;
let exchange;
let queueId = DeviceInfo.getUniqueID() || (+new Date + '');
console.log(queueId);
let connected = false;

export function rabbitmqMiddleware(store) {
  return next => action => {
    if (connection && exchange && queue && action.type === actions.RABBITMQ_SEND_MESSAGE) {
        let routing_key = 'react-native-queue';
  			let exchange_name = 'react-native-exchange';
  			queue.publish(action.payload, exchange_name, routing_key)
    }

    return next(action);
  };
}

export default function(store) {
  console.log("start Rabbitmq middlewares");
  connection.connect();
  store.dispatch(actions.connectRabbitAttempt({}));
  connection.on('error', (event) => {
    connected = false;
    store.dispatch(actions.connectRabbitFailed({
      deviceInfo: device
    }));
  });

  connection.on('connected', (event) => {
    console.log('connected', event);
    connected = true;
    store.dispatch(actions.connectRabbitSuccess({
      deviceInfo: device
    }));
    queue = new Queue(connection, {
      name: queueId,
      durable: false,
      autoDelete: false,
      exclusive: false,
      consumer_arguments: {
        'x-priority': 1
      }
    });
    exchange = new Exchange(connection, {
      name: 'react-native-exchange',
      type: 'fanout',
      durable: false,
      autoDelete: false,
      exclusive: false,
      internal: false,
      confirm: true
    });

    queue.bind(exchange, queueId);

    queue.on('message', (data) => {
      console.log('message', data);
      store.dispatch(actions.rabbitMessage(data));
    });

    queue.on('messages', (data) => {
      //console.log('messages', data);
      //store.dispatch(actions.rabbitMessages(data));
    });
    let routing_key = 'react-native-queue';

    let properties = {
      expiration: 10000,
    }
    exchange.publish('queueId : ' + queueId + ' is online', routing_key, properties);
  });
}
