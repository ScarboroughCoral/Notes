let time=0;
function Item(val){
    this.val=val;
    this.time=time++;
}
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity=capacity;
    this.cache=new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(!this.cache.has(key)) return -1;
    let item=this.cache.get(key);
    item.time=time++;
    return item.val;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    
    if(this.cache.has(key)){
        let item=this.cache.get(key);
        item.time=time++;
        item.val=value;
        return;
    }
    if(this.cache.size>=this.capacity){
        let minT=Number.MAX_VALUE,minK;
        for(let [k,{time}] of this.cache){
            if(minT>time){
                minT=time;
                minK=k;
            }
        }
        this.cache.delete(minK);
    }
    let item=new Item(value);
    this.cache.set(key,item);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */