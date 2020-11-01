let rec fib = n => {
  switch n {
  | 0 | 1 => 1
  | n => fib(n - 1) + fib(n - 2)
  }
}

let squareSum = numbers => {
  numbers
}

Js.log(fib(0))
