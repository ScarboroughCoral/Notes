/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
  this.q = [[], []];
};

/**
* Push element x to the back of queue. 
* @param {number} x
* @return {void}
*/
MyQueue.prototype.push = function (x) {
  this.q[0].push(x);
};

/**
* Removes the element from in front of queue and returns that element.
* @return {number}
*/
MyQueue.prototype.pop = function () {
  if (this.q[1].length === 0) {
    while (this.q[0].length) this.q[1].push(this.q[0].pop());
  }
  return this.q[1].pop();
};

/**
* Get the front element.
* @return {number}
*/
MyQueue.prototype.peek = function () {
  if (this.q[1].length === 0) {
    while (this.q[0].length) this.q[1].push(this.q[0].pop());
  }
  return this.q[1][this.q[1].length - 1];
};

/**
* Returns whether the queue is empty.
* @return {boolean}
*/
MyQueue.prototype.empty = function () {
  return this.q.every(x => x.length === 0)
};

/**
* Your MyQueue object will be instantiated and called as such:
* var obj = new MyQueue()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.peek()
* var param_4 = obj.empty()
*/