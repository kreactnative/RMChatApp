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
  "44f17c04d8878bab" : "http://pre08.deviantart.net/f756/th/pre/i/2016/096/8/b/the_legend_of_zelda___link_avatar_by_ffionm0rgan-d9xzjrc.png",
  "d8c0e888e098023" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH3ZReeKOl0YhnVFGqP487_bagF4Fvuk5pqixrSMVNptrkNEQF",
  "514fc3f2d15cc387" : "http://orig11.deviantart.net/ee7a/f/2009/189/2/f/chibi_link_by_meitou.png"
}
