// https://www.codewars.com/kata/5949481f86420f59480000e7/train/javascript

module Arithmetic = {
  let fmod = (~divident, ~divisor) => {
    divident -. divisor *. Js.Math.floor_float(divident /. divisor)
  }

  let rec listSum = (~result=0., list) =>
    switch list {
    | list{} => result
    | list{a, ...rest} => listSum(rest, ~result=result +. a)
    }
}

@unboxed type addOrEvenResult = IsEven(bool)

let oddOrEvenFloatArray = array => {
  let arraySum = array->Belt.List.fromArray->Arithmetic.listSum
  let arraySumRemainder = Arithmetic.fmod(~divident=arraySum, ~divisor=2.)
  let isEven = arraySumRemainder === 0.

  IsEven(isEven)
}

@genType.as("oddOrEven")
export oddOrEvenJs = array => {
  switch oddOrEvenFloatArray(array) {
  | IsEven(true) => "even"
  | IsEven(false) => "odd"
  }
}
