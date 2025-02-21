function getSubsets(arr) {
  let results = [];
  let flag = [];
  const subset = (depth) => {
    if (depth === arr.length) {
      console.log(depth, flag);
      let result = arr.filter((el, index) => flag[index]);
      results.push(result);
      return;
    }
    subset(depth + 1);
    flag[depth] = false;
    subset(depth + 1);
  };
  subset(0);
  return results;
}
console.log(getSubsets([1, 2, 3, 4]));
