/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.sums = Array(nums.length + 1).fill(0);
  this.sums[1] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    this.sums[i + 1] = nums[i] + this.sums[i];
  }
};

/** 
* @param {number} i 
* @param {number} j
* @return {number}
*/
NumArray.prototype.sumRange = function (i, j) {
  return this.sums[j + 1] - this.sums[i];
};

/**
* Your NumArray object will be instantiated and called as such:
* var obj = new NumArray(nums)
* var param_1 = obj.sumRange(i,j)
*/