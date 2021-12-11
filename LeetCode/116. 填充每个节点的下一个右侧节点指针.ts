/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     left: Node | null
 *     right: Node | null
 *     next: Node | null
 *     constructor(val?: number, left?: Node, right?: Node, next?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function connect(root: Node | null): Node | null {
    if (root === null) return null
    const connect2Nodes = (a: Node | null,b: Node | null) => {
        if (a === null || b === null) return
        a.next = b
        connect2Nodes(a.left, a.right)
        connect2Nodes(a.right, b.left)
        connect2Nodes(b.left, b.right)
    }
    connect2Nodes(root.left, root.right)
    return root 
};
