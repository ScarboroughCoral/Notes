/**====================================利用位异或（结合律），加减法类似。
 * @param {number[]} numbers
 * @return {number[]}
 */
var swapNumbers = function (numbers) {
  numbers[0] = numbers[1] ^ numbers[0];
  numbers[1] = numbers[1] ^ numbers[0];
  numbers[0] = numbers[0] ^ numbers[1];
  return numbers;
};