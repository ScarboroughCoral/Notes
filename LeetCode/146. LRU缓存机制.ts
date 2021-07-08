class DLinkedNode{
    constructor(public k=0,public v=0,public prev:any=null,public next:any=null){}
}
class LRUCache{
    
    constructor(public capacity: number,
                public size=0,
                public m=new Map<number,DLinkedNode>(),
                public head=new DLinkedNode(),
                public tail=new DLinkedNode()
    ){
        this.head.next=this.tail;
        this.tail.prev=this.head;
    }
    get(key: number): number {
        if(!this.m.has(key)) return -1;
        let node=this.m.get(key) as DLinkedNode;
        this.moveToHead(node);
        return node.v;
    }
    put(key: number, value: number): void {
        if(!this.m.has(key)){
            let node=new DLinkedNode(key,value);
            this.m.set(key,node);
            this.addToHead(node);
            ++this.size;
            if(this.size>this.capacity){
                let removed=this.removeTail();
                this.m.delete(removed);
                --this.size;
            }
        }else{
            let node=this.m.get(key) as DLinkedNode;
            node.v=value;
            this.moveToHead(node);
        }
    }
    addToHead(node:DLinkedNode){
        node.next=this.head.next;
        node.next.prev=node;
        node.prev=this.head;
        this.head.next=node;
    }
    removeNode(node:DLinkedNode){
        node.prev.next=node.next;
        node.next.prev=node.prev;
    }
    moveToHead(node:DLinkedNode){
        this.removeNode(node);
        this.addToHead(node);
    }
    removeTail():number{
        let ret=this.tail.prev;
        this.removeNode(ret);
        return ret.k;
    }
}


/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
