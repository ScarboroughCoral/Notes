import Singleton from "./单例模式";

test("测试单例模式", () => {
  expect(Singleton.getInstance()).toBe(Singleton.getInstance());
});
