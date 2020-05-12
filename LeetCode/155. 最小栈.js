/**
 * initialize your data structure here.
 */
const data = Symbol("data");
var MinStack = function () {
  this[data] = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  if (this[data].length === 0) {
    this[data].push({
      val: x,
      min: x,
    });
    return;
  }
  let topIdx = this[data].length - 1;
  this[data].push({
    val: x,
    min: Math.min(x, this[data][topIdx].min),
  });
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this[data].pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  let topIdx = this[data].length - 1;
  return this[data][topIdx].val;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  let topIdx = this[data].length - 1;
  return this[data][topIdx].min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
