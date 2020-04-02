/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  let a = s.split('');
  let l = 0, r = a.length - 1;
  while (l < r) {
    while (l < r && /[^aeiou]/i.test(a[l])) l++;
    while (l < r && /[^aeiou]/i.test(a[r])) r--;
    let tmp = a[l];
    a[l] = a[r];
    a[r] = tmp;
    l++;
    r--;
  }
  return a.join('');
};