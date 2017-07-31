import apisauce from 'apisauce';
import {AsyncStorage} from 'react-native';
export const baseURL = 'http://192.168.1.3:7099/';

const json = (data) => {
  console.log('json',data);
  return JSON.stringify(data);
}


const formData = (data) => {
  console.log('formData',data);
  const str = [];
  for (const p in data) {
    const key = encodeURIComponent(p);
    const value = encodeURIComponent(data[p]);
    str.push(`${key}=${value}`);
  }
  return str.join('&');
}

const api = apisauce.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.addAsyncRequestTransform(request => async () => {
  console.log('addAsyncRequestTransform')
  const token = await AsyncStorage.getItem('token');
  console.log(token);
  if (token)
    request.headers['Authentication'] = token;
  else
    delete request.headers['Authentication'];
});

const register   = (payload) => api.post('api/users/register', json(payload));
const login   = (payload) => api.post('api/users/login', payload);
const logout        = () => api.post('api/users/logout');

export default {
  api,
  baseURL,
  json,
  login,
  register,
  logout
};
