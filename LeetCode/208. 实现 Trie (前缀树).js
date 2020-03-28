/**
 * Initialize your data structure here.
 */
var Trie = function () {
  this.end = false;
  this.next = Array(26).fill(null);
};

/**
* Inserts a word into the trie. 
* @param {string} word
* @return {void}
*/
Trie.prototype.insert = function (word) {
  let node = this;
  for (let c of word) {
    let idx = c.charCodeAt(0) - 'a'.charCodeAt(0);
    if (node.next[idx] === null) {
      node.next[idx] = new Trie();
    }
    node = node.next[idx];
  }
  node.end = true;
};

/**
* Returns if the word is in the trie. 
* @param {string} word
* @return {boolean}
*/
Trie.prototype.search = function (word) {
  let node = this;
  for (let c of word) {
    let idx = c.charCodeAt(0) - 'a'.charCodeAt(0);
    if (node.next[idx] === null) return false;
    node = node.next[idx];
  }
  return node.end;
};

/**
* Returns if there is any word in the trie that starts with the given prefix. 
* @param {string} prefix
* @return {boolean}
*/
Trie.prototype.startsWith = function (prefix) {
  let node = this;
  for (let c of prefix) {
    let idx = c.charCodeAt(0) - 'a'.charCodeAt(0);
    if (node.next[idx] === null) return false;
    node = node.next[idx];
  }
  return true;
};

/**
* Your Trie object will be instantiated and called as such:
* var obj = new Trie()
* obj.insert(word)
* var param_2 = obj.search(word)
* var param_3 = obj.startsWith(prefix)
*/