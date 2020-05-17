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
  if (this[data].length) {
    this[data].push({
      val: x,
      min: Math.min(x, this[data][this[data].length - 1].min),
    });
  } else {
    this[data].push({
      val: x,
      min: x,
    });
  }
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
  return this[data][this[data].length - 1].val;
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  return this[data][this[data].length - 1].min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
