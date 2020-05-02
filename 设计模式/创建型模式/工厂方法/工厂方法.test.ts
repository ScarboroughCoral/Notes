import { CreatorB, CreatorA } from './工厂方法';


test('测试工厂方法', () => {
  let creatorA = new CreatorA();
  let creatorB = new CreatorB();
  expect(creatorA.someOperation()).toBe('created a product A');
  expect(creatorB.someOperation()).toBe('created a product B')
})