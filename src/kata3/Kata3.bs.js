// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";

function pinchArray(array, pinchLeft, pinchRight) {
  var arrayLength = array.length;
  if (pinchLeft) {
    if (pinchRight) {
      return {
              restArray: Belt_Array.slice(array, 1, arrayLength - 2 | 0),
              leftValue: Belt_Array.get(array, 0),
              rightValue: Belt_Array.get(array, arrayLength - 1 | 0)
            };
    } else {
      return {
              restArray: Belt_Array.slice(array, 1, arrayLength - 1 | 0),
              leftValue: Belt_Array.get(array, 0),
              rightValue: undefined
            };
    }
  } else if (pinchRight) {
    return {
            restArray: Belt_Array.slice(array, 0, arrayLength - 1 | 0),
            leftValue: undefined,
            rightValue: Belt_Array.get(array, arrayLength - 1 | 0)
          };
  } else {
    return {
            restArray: array,
            leftValue: undefined,
            rightValue: undefined
          };
  }
}

function peak(array) {
  var _leftSumOpt;
  var _leftIdx;
  var _rightSumOpt;
  var _rightIdx;
  var _restArray = array;
  var _param;
  while(true) {
    var leftSumOpt = _leftSumOpt;
    var rightSumOpt = _rightSumOpt;
    var restArray = _restArray;
    var rightIdx = _rightIdx;
    var leftIdx = _leftIdx;
    var leftSum = leftSumOpt !== undefined ? leftSumOpt : 0;
    var rightSum = rightSumOpt !== undefined ? rightSumOpt : 0;
    if (leftIdx !== undefined && rightIdx !== undefined) {
      if ((leftIdx + 1 | 0) >= (rightIdx - 1 | 0)) {
        var isShrinkFinished = (leftIdx + 1 | 0) === (rightIdx - 1 | 0);
        var areSumsEqual = leftSum === rightSum;
        if (isShrinkFinished && areSumsEqual) {
          return leftIdx + 1 | 0;
        } else {
          return -1;
        }
      }
      var isLeftSumGte = leftSum >= rightSum;
      if (isLeftSumGte) {
        var match = pinchArray(restArray, false, true);
        var rightValue = match.rightValue;
        if (rightValue === undefined) {
          return -1;
        }
        _param = undefined;
        _restArray = match.restArray;
        _rightIdx = rightIdx - 1 | 0;
        _rightSumOpt = rightSum + rightValue | 0;
        _leftIdx = leftIdx;
        _leftSumOpt = leftSum;
        continue ;
      }
      var match$1 = pinchArray(restArray, true, false);
      var leftValue = match$1.leftValue;
      if (leftValue === undefined) {
        return -1;
      }
      _param = undefined;
      _restArray = match$1.restArray;
      _rightIdx = rightIdx;
      _rightSumOpt = rightSum;
      _leftIdx = leftIdx + 1 | 0;
      _leftSumOpt = leftSum + leftValue | 0;
      continue ;
    }
    var match$2 = pinchArray(restArray, true, true);
    var rightValue$1 = match$2.rightValue;
    var leftValue$1 = match$2.leftValue;
    if (leftValue$1 === undefined) {
      return -1;
    }
    if (rightValue$1 === undefined) {
      return -1;
    }
    var restArrayLength = restArray.length;
    var initialRightIdx = restArrayLength - 1 | 0;
    _param = undefined;
    _restArray = match$2.restArray;
    _rightIdx = initialRightIdx;
    _rightSumOpt = rightValue$1;
    _leftIdx = 0;
    _leftSumOpt = leftValue$1;
    continue ;
  };
}

export {
  peak ,
  
}
/* No side effect */
