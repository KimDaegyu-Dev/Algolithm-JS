function permutation(arr, selectCnt) {
  let result = [];
  if (selectCnt === 1) return arr.map((el) => [el]);
  arr.forEach((fixed, index, origin) => {
    let rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    let permutations = permutation(rest, selectCnt - 1);
    let attached = permutations?.map((el) => [fixed, ...el]) ?? [];
    console.log(
      "arr:",
      arr,
      "permu",
      permutations,
      "rest",
      rest,
      "attached",
      attached
    );
    result.push(...attached);
  });

  return result;
}
// console.log("result", permutation([1, 2, 3, 4], 3));
function permutationWithRepetition(arr, selectCnt) {
  let result = [];
  if (selectCnt === 1) return arr.map((el) => [el]);
  arr.forEach((fixed, index, origin) => {
    let rest = origin;
    let permutations = permutation(rest, selectCnt - 1);
    let attached = permutations?.map((el) => [fixed, ...el]) ?? [];
    result.push(...attached);
  });

  return result;
}
function isPrime(num) {
  if (num === 2) return true;
  if (num < 2) return false; // 1 이하의 숫자는 소수가 아님

  let arr = Array.from(
    { length: Math.floor(Math.sqrt(num)) - 1 },
    (_, i) => i + 2
  );

  for (let i of arr) {
    if (num % i === 0) {
      return false; // 나누어 떨어지면 소수가 아님
    }
  }

  return true; // 위 조건을 모두 통과하면 소수
}

console.log(isPrime(16)); // false
console.log(isPrime(17)); // true
console.log(isPrime(2)); // true
console.log(isPrime(1)); // false
console.log(isPrime(37)); // true
