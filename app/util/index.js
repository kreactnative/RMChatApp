import isJson from 'is-json';

export function json2Str(obj) {
  if(obj)
    return JSON.stringify(obj);
  else
    return '{}';
}

export function str2Json(str) {
  if(isJson(str))
    return JSON.parse(str);
  else
    return undefined;
}
