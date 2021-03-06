import * as actions from '../actions/rabbitmq';
import {
  Connection,
  Exchange,
  Queue
} from 'react-native-rabbitmq';

import DeviceInfo from 'react-native-device-info';

import moment from 'moment';


import { RABBITMQ_TYPE } from '../util/constant';

import { json2Str, str2Json, avatars } from '../util';


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

// 174.138.24.113
// 192.168.1.2
const config = {
  host: 'amqp.dotnetnat.biz',
  port: 5672,
  username: 'admin',
  password: '56255625',
  virtualhost: '/'
};

let connection = new Connection(config);
let queue;
let exchange;
let queueId = device.uniqueID || (+new Date + '');
console.log(queueId);
let connected = false;
let routing_key = queueId;// 'react-native-queue';
let exchange_name = 'react-native-exchange';
let properties = {
  expiration: 10000,
}

export function rabbitmqMiddleware(store) {
  return next => action => {
    if (connection && exchange && queue && action.type === actions.RABBITMQ_SEND_MESSAGE) {
        //let routing_key = queue.name;//'react-native-queue';
  			//let exchange_name = 'react-native-exchange';
        //console.log(routing_key);
  			queue.publish(action.payload, exchange_name, routing_key)
        console.log(exchange);
        exchange.publish(action.payload, queueId, properties);
    }

    return next(action);
  };
}

export default function(store) {
  console.log("start Rabbitmq middlewares");
  //if(connected ==false){
  connection.connect();
  store.dispatch(actions.connectRabbitAttempt({}));
  //}
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
      name: exchange_name,
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
      console.log('messages', data);
      //store.dispatch(actions.rabbitMessages(data));
    });


    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    // First Join Message;
    const exchangeMessage = {
      name: queueId,
      user: queueId,
      avatar: (avatars[queueId]) ? avatars[queueId]: 'http://img1.jurko.net/avatar_6736.gif',
      type: RABBITMQ_TYPE.ONLINE,
      uniqueId: (+new Date + ''),
      message: 'queueId : ' + queueId + ' is online',
      createAt: now,
      position: 'left',
    };


    exchange.publish(json2Str(exchangeMessage), queueId, properties);
  });
}
