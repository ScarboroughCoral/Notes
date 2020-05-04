export interface Iterator<K, V> {
  current(): V;
  next(): V;
  key(): K;
  valid(): boolean;
  rewind(): void;
}

export class AlphabeticalOrderIterator implements Iterator<number, string> {
  private position: number = 0;
  constructor(
    private collection: WordsCollection,
    private reverse: boolean = false
  ) {
    if (reverse) this.position = this.collection.getCount() - 1;
  }
  key(): number {
    return this.position;
  }
  current(): string {
    return this.collection.getItems()[this.position];
  }
  next(): string {
    let item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }
  valid(): boolean {
    return this.reverse
      ? this.position >= 0
      : this.position < this.collection.getCount();
  }
  rewind(): void {}
}

export interface Iterable<K, V> {
  getIterator(): Iterator<K, V>;
}

export class WordsCollection implements Iterable<number, string> {
  private items: string[] = [];
  public getItems(): string[] {
    return this.items;
  }
  public getCount(): number {
    return this.items.length;
  }
  public addItem(item: string): void {
    this.items.push(item);
  }
  getIterator(): Iterator<number, string> {
    return new AlphabeticalOrderIterator(this);
  }
  getIteratorReverse(): Iterator<number, string> {
    return new AlphabeticalOrderIterator(this, true);
  }
}
