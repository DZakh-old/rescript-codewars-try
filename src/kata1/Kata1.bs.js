// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Belt_List from "bs-platform/lib/es6/belt_List.js";

function fmod(divident, divisor) {
  return divident - divisor * Math.floor(divident / divisor);
}

function listSum(_resultOpt, _list) {
  while(true) {
    var resultOpt = _resultOpt;
    var list = _list;
    var result = resultOpt !== undefined ? resultOpt : 0;
    if (!list) {
      return result;
    }
    _list = list.tl;
    _resultOpt = result + list.hd;
    continue ;
  };
}

function oddOrEvenFloatArray(array) {
  var arraySum = listSum(undefined, Belt_List.fromArray(array));
  var arraySumRemainder = fmod(arraySum, 2);
  return arraySumRemainder === 0;
}

function oddOrEvenJs(array) {
  var match = oddOrEvenFloatArray(array);
  if (match) {
    return "even";
  } else {
    return "odd";
  }
}

export {
  oddOrEvenFloatArray ,
  oddOrEvenJs ,
  
}
/* No side effect */
