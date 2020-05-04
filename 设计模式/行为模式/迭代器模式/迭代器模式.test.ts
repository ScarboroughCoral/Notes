import { WordsCollection } from "./迭代器模式";

test("测试迭代器模式", () => {
  let words = new WordsCollection();
  words.addItem("what");
  words.addItem("is");
  words.addItem("your");
  words.addItem("name");
  let it = words.getIterator();
  let idx = 0;
  while (it.valid()) {
    expect(it.next()).toBe(words.getItems()[idx++]);
  }
  let itReverse = words.getIteratorReverse();
  let idxReverse = words.getCount() - 1;
  while (itReverse.valid()) {
    expect(itReverse.next()).toBe(words.getItems()[idxReverse--]);
  }
});
