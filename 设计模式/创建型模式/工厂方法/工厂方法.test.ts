import { clientCode, CreatorB, CreatorA } from './工厂方法';


test('测试工厂方法', () => {
  expect(clientCode(new CreatorA())).toBe('created a product A');
  expect(clientCode(new CreatorB())).toBe('created a product B');
})