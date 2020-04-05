let count = 0n;
function Item(val) {
  this.val = val;
  this.freq = 1;
  this.time = count++;
}
/**
 * @param {number} capacity
 */
var LFUCache = function (capacity) {
  this.capacity = capacity;
  this.cache = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
  if (!this.cache.has(key)) return -1;
  let item = this.cache.get(key);
  item.freq++;
  item.time = count++;
  return item.val;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
  if (this.capacity <= 0) return;
  if (this.cache.has(key)) {
    let item = this.cache.get(key);
    item.freq++;
    item.val = value;
    item.time = count++;
    return;
  }
  if (this.cache.size === this.capacity) {
    let minFreq = Number.MAX_SAFE_INTEGER, minK = -1, minT;
    for (let [k, { freq, time }] of this.cache) {
      if (minFreq > freq) {
        minFreq = freq;
        minK = k;
        minT = time;
      } else if (minFreq === freq && time < minT) {
        minK = k;
        minT = time;
      }
    }
    this.cache.delete(minK);
  }
  let x = new Item(value);
  this.cache.set(key, x);
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */