import { Iterable, Iterator } from "./迭代器模式";

export interface BinaryTreeIterable<K, V> {
  getPreOrderIterator(): Iterator<K, V>;
  getInOrderIterator(): Iterator<K, V>;
  getPostOrderIterator(): Iterator<K, V>;
}

export class BinaryTreeIterator<K, V> implements Iterator<K, V> {
  current(): V {
    throw new Error("Method not implemented.");
  }
  next(): V {
    throw new Error("Method not implemented.");
  }
  key(): K {
    throw new Error("Method not implemented.");
  }
  valid(): boolean {
    throw new Error("Method not implemented.");
  }
  rewind(): void {
    throw new Error("Method not implemented.");
  }
}

export class Node<T> {
  constructor(
    private val: T,
    private left: Node<T> | null = null,
    private right: Node<T> | null = null
  ) {}
}

export class BinaryTree<T> implements Iterable<T, T>, BinaryTreeIterable<T, T> {
  getPreOrderIterator(): Iterator<T, T> {
    throw new Error("Method not implemented.");
  }
  getInOrderIterator(): Iterator<T, T> {
    throw new Error("Method not implemented.");
  }
  getPostOrderIterator(): Iterator<T, T> {
    throw new Error("Method not implemented.");
  }
  getIterator(): Iterator<T, T> {
    throw new Error("Method not implemented.");
  }
}
