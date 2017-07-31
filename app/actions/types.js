
export type Action =
  { type: 'PUSH_NEW_ROUTE', route: string }
    | { type: 'POP_ROUTE' }
    | { type: 'POP_TO_ROUTE', route: string }
    | { type: 'REPLACE_ROUTE', route: string }
    | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
    | { type: 'OPEN_DRAWER'}
    | { type: 'CLOSE_DRAWER'}
    | { type: 'SET_USER', name: string}
    | { type: 'SET_LIST', list: string}

    | { type: 'LOGIN_ATTEMPT', userinfo: Object}
    | { type: 'LOGIN_SUCCESS'}
    | { type: 'LOGIN_FAILED'}

    | { type: 'LOGOUT'}

    | { type: 'CHANGE_STATUS_REQUEST'}
    | { type: 'CHANGE_STATUS_SUCCESS'}
    | { type: 'CHANGE_STATUS_FAILED'}

    | { type: 'GET_LAUNCHES_REQUEST'}
    | { type: 'GET_LAUNCHES_SUCCESS'}
    | { type: 'GET_LAUNCHES_FAILED'}

    | { type: 'REGISTER_ATTEMPT', userinfo: Object}
    | { type: 'REGISTER_SUCCESS'}
    | { type: 'REGISTER_FAILED'};

export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
