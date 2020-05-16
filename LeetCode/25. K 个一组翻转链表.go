package main
import "C"
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
 
 func reverseKGroup(head *ListNode, k int) *ListNode {
	hair:=&ListNode{Next:head}
	pre:=hair
	for head!=nil{
			tail:=pre
			for i:=0;i<k;i++{
					tail=tail.Next;
					if tail==nil{
							return hair.Next
					}
			}
			nxt:=tail.Next
			head,tail=reverseLink(head,tail)
			pre.Next=head
			tail.Next=nxt
			pre=tail
			head=nxt
	}
	return hair.Next
}

func reverseLink(head *ListNode,tail *ListNode) (*ListNode,*ListNode){
	pre:=tail.Next
	p:=head
	for pre!=tail{
			nxt:=p.Next
			p.Next=pre
			pre=p
			p=nxt
	}
	return tail,head
}