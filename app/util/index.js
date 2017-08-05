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

export const avatars={
  "26393e36469b5619" : "http://174.138.24.113:3098/images/avatars/boy-2-128.png",
  "26ba706ba17ce51d" : "http://174.138.24.113:3098/images/avatars/matureman2-2-128.png",
  "96f427d1833544b" : "http://174.138.24.113:3098/images/avatars/supportmale-2-128.png",
  "d4706d565c005e6c" : "http://174.138.24.113:3098/images/avatars/male-128.png"
}
