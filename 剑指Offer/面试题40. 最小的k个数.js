/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function (arr, k) {
  if (k === 0) return [];
  function ajust(parent, len) {
    let child = 2 * parent + 1;
    let tmp = arr[parent];
    while (child < len) {
      if (child + 1 < len && arr[child + 1] < arr[child]) child += 1;
      if (tmp <= arr[child]) break;
      arr[parent] = arr[child];
      parent = child;
      child = 2 * parent + 1;
    }
    arr[parent] = tmp;
  }
  for (let i = (arr.length - 1) / 2 | 0; i >= 0; i--) ajust(i, arr.length);

  for (let i = arr.length - 1; i > arr.length - 1 - k; i--) {
    let tmp = arr[i];
    arr[i] = arr[0];
    arr[0] = tmp;
    ajust(0, i);
  }
  return arr.slice(-k);
};