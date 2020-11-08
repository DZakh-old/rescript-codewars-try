// https://www.codewars.com/kata/525e5a1cb735154b320002c8/train/javascript

open Belt

type pinchArrayResult<'a> = {restArray: array<'a>, leftValue: option<'a>, rightValue: option<'a>}
let pinchArray = (~array, ~pinchLeft, ~pinchRight) => {
  let arrayLength = Array.length(array)

  switch (pinchLeft, pinchRight) {
  | (true, true) => {
      restArray: Array.slice(array, ~offset=1, ~len=arrayLength - 2),
      leftValue: array[0],
      rightValue: array[arrayLength - 1],
    }
  | (true, false) => {
      restArray: Array.slice(array, ~offset=1, ~len=arrayLength - 1),
      leftValue: array[0],
      rightValue: None,
    }
  | (false, true) => {
      restArray: Array.slice(array, ~offset=0, ~len=arrayLength - 1),
      leftValue: None,
      rightValue: array[arrayLength - 1],
    }
  | (false, false) => {
      restArray: array,
      leftValue: None,
      rightValue: None,
    }
  }
}

let rec recPeakShrink = (~leftSum=0, ~leftIdx=?, ~rightSum=0, ~rightIdx=?, ~restArray, ()) => {
  switch (leftIdx, rightIdx) {
  | (None, Some(_))
  | (Some(_), None)
  | (None, None) => {
      let {restArray: newRestArray, leftValue, rightValue} = pinchArray(
        ~array=restArray,
        ~pinchLeft=true,
        ~pinchRight=true,
      )

      switch (leftValue, rightValue) {
      | (None, Some(_))
      | (Some(_), None)
      | (None, None) => -1
      | (Some(realLeftValue), Some(realRightValue)) => {
          let restArrayLength = Array.length(restArray)
          let initialLeftIdx = 0
          let initialRightIdx = restArrayLength - 1
          recPeakShrink(
            ~leftSum=realLeftValue,
            ~leftIdx=initialLeftIdx,
            ~rightSum=realRightValue,
            ~rightIdx=initialRightIdx,
            ~restArray=newRestArray,
            (),
          )
        }
      }
    }
  | (Some(curLeftIdx), Some(curRightIdx))
    when {
      let isStillShrinking = curLeftIdx + 1 < curRightIdx - 1
      !isStillShrinking
    } => {
      let isShrinkFinished = curLeftIdx + 1 === curRightIdx - 1
      let areSumsEqual = leftSum === rightSum

      switch (isShrinkFinished, areSumsEqual) {
      | (true, true) => curLeftIdx + 1
      | (false, true)
      | (true, false)
      | (false, false) => -1
      }
    }
  | (Some(curLeftIdx), Some(curRightIdx)) => {
      let isLeftSumGte = leftSum >= rightSum

      switch isLeftSumGte {
      | true => {
          let {restArray: newRestArray, rightValue} = pinchArray(
            ~array=restArray,
            ~pinchLeft=false,
            ~pinchRight=true,
          )

          switch rightValue {
          | None => -1
          | Some(realRightValue) =>
            recPeakShrink(
              ~leftSum,
              ~leftIdx=curLeftIdx,
              ~rightSum=rightSum + realRightValue,
              ~rightIdx=curRightIdx - 1,
              ~restArray=newRestArray,
              (),
            )
          }
        }
      | false => {
          let {restArray: newRestArray, leftValue} = pinchArray(
            ~array=restArray,
            ~pinchLeft=true,
            ~pinchRight=false,
          )

          switch leftValue {
          | None => -1
          | Some(realLeftValue) =>
            recPeakShrink(
              ~leftSum=leftSum + realLeftValue,
              ~leftIdx=curLeftIdx + 1,
              ~rightSum,
              ~rightIdx=curRightIdx,
              ~restArray=newRestArray,
              (),
            )
          }
        }
      }
    }
  }
}

let peak = array => {
  recPeakShrink(~restArray=array, ())
}
