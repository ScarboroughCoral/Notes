import Database from "./单例模式";

test("测试数据库连接类单例", () => {
  expect(Database.getInstance()).toBe(Database.getInstance());
});
