// https://www.codewars.com/kata/525e5a1cb735154b320002c8/train/javascript

let rec triangular = n => {
  switch n {
  | _ when n <= 0 => 0
  | _ => n + triangular(n - 1)
  }
}
