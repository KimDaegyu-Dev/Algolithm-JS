export function pipe(...fns) {
  return (param) => fns.reduce((result, fn) => fn(result), param);
}
export function tokenizer(str) {
  const wordRegex = /\w+/g;
  return str.match(wordRegex);
}
