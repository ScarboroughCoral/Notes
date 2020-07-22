function findMin(numbers: number[]): number {
  let len = numbers.length;
  if (numbers[len - 1] > numbers[0]) return numbers[0];
  let l = 0,
    r = len - 1;
  while (l < r) {
    let mid = (l + (r - l) / 2) | 0;
    if (numbers[mid] > numbers[r]) l = mid + 1;
    else if (numbers[mid] < numbers[r]) r = mid;
    else r--;
  }
  return numbers[l];
}
