import type { Action } from './types';

export const RABBITMQ_CONNECT_ATTEMPT = 'RABBITMQ_CONNECT_ATTEMPT';
export const RABBITMQ_CONNECT_SUCCESS = 'RABBITMQ_CONNECT_SUCCESS';
export const RABBITMQ_CONNECT_FAILED = 'RABBITMQ_CONNECT_FAILED';
export const RABBITMQ_ON_MESSAGE = 'RABBITMQ_ON_MESSAGE';
export const RABBITMQ_ON_MESSAGES = 'RABBITMQ_ON_MESSAGES';
export const RABBITMQ_SEND_MESSAGE = 'RABBITMQ_SEND_MESSAGE';

export function rabbitSendMessage(payload): Action {
  return {
    type: RABBITMQ_SEND_MESSAGE,
    payload
  };
};

export function rabbitMessage(payload): Action {
  return {
    type: RABBITMQ_ON_MESSAGE,
    payload
  };
};

export function rabbitMessages(payload): Action {
  return {
    type: RABBITMQ_ON_MESSAGES,
    payload
  };
};

export function connectRabbitAttempt(payload): Action {
  return {
    type: RABBITMQ_CONNECT_ATTEMPT,
    payload
  };
};

export function connectRabbitSuccess(payload): Action {
  return {
    type: RABBITMQ_CONNECT_SUCCESS,
    payload
  };
};

export function connectRabbitFailed(payload): Action {
  return {
    type: RABBITMQ_CONNECT_FAILED,
    payload
  }
};
