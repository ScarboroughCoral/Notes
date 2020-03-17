export function minSum(arr: number[]) {
  // your code here
  arr.sort((a, b) => a - b);
  let i = 0, j = arr.length - 1;
  let result = 0;
  while (i < j) {
    result += arr[i] * arr[j];
    i++, j--;
  }
  return result;
}