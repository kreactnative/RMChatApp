import * as actions from '../actions/rabbitmq';
import {
  Connection,
  Exchange,
  Queue
} from 'react-native-rabbitmq';

const config = {
  host: '192.168.1.2',
  port: 5672,
  username: 'admin',
  password: '56255625',
  virtualhost: '/'
};

let connection = new Connection(config);
let queue;
let exchange;
let queueId = +new Date + '';

export function rabbitmqMiddleware(store) {
  return next => action => {
    /*if (socket && action.type === actions.ADD_MESSAGE) {
      socket.emit('message', action.message);
    }*/

    return next(action);
  };
}

export default function(store) {
  connection.connect();

  connection.on('error', (event) => {
    console.log('error', event);
    store.dispatch(actions.connectRabbitFailed(event));
  });

  connection.on('connected', (event) => {
    console.log('connected', event);
    store.dispatch(actions.connectRabbitSuccess(event));
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
      console.log('messages', data);
      store.dispatch(actions.rabbitMessages(data));
    });
    let routing_key = 'react-native-queue';

    let properties = {
      expiration: 10000,
    }
    exchange.publish('queueId : ' + queueId + ' is online', routing_key, properties);
  });
}
