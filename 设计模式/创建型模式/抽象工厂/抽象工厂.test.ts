import {
  ProductA,
  ProductB,
  ProductA1,
  ProductB1,
  ProductA2,
  ProductB2,
  AbstractFactory,
  Factory1,
  Factory2,
} from "./抽象工厂";

test("测试抽象工厂", () => {
  let factory1: AbstractFactory = new Factory1();
  let factory2: AbstractFactory = new Factory2();
  expect(factory1.createProductA()).toBeInstanceOf(ProductA1);
  expect(factory1.createProductB()).toBeInstanceOf(ProductB1);
  expect(factory2.createProductA()).toBeInstanceOf(ProductA2);
  expect(factory2.createProductB()).toBeInstanceOf(ProductB2);
});
