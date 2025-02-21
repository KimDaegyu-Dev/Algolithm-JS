function lis(arr) {
  let list = [];
  let track = [];
  arr.forEach((el, i) => {
    if (list.length === 0 || el > list[list.length - 1]) {
      list.push(el);
      track[i] = [el, list.length - 1];
    } else if (el < list[list.length - 1]) {
      let idx = binarySearch(list, el);
      //   console.log("arr:", arr, "\nlist:", list, "\nel", el, "\nidx", idx);
      list[idx] = el;
      track[i] = [el, idx];
    }
  });
  console.log(track, list);
  let idx = list.length - 1;
  for (let i = track.length - 1; i >= 0; i--) {
    if (track[i][1] === idx) {
      list[idx] = track[i][0];
    }
    idx--;
  }
  console.log(track, list);
  return list.length;
}
function binarySearch(arr, el) {
  let left = 0;
  let right = arr.length - 1;
  let mid;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] === el) return mid;
    else if (arr[mid] < el) {
      left = mid + 1;
    } else right = mid - 1;
  }
  return mid;
}

console.log(lis([10, 20, 1, 2, 3, 4, 8, 6]));

console.log(lis([10, 30, 50, 20, 60]));
