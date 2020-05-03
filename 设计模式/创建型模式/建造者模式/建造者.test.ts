import { Director, Builder1, Builder2, Builder, Product } from "./建造者";

test("测试建造者模式【导演模式】", () => {
  let director = new Director(new Builder1());
  expect(director.make("simple").listParts()).toBe("3");
  expect(director.make("normal").listParts()).toBe("1-2-3");
  director.changeBuilder(new Builder2());
  expect(director.make("simple").listParts()).toBe("3");
  expect(director.make("normal").listParts()).toBe("1+2+3");
});

test("测试建造者模式【自定义模式】", () => {
  let builder: Builder = new Builder1();
  let prod1: Product = builder
    .buildStep1()
    .buildStep3()
    .buildStep2()
    .buildStep1()
    .getResult();
  expect(prod1.listParts()).toBe("1-3-2-1");
  builder = new Builder2();
  let prod2: Product = builder.buildStep1().buildStep2().getResult();
  expect(prod2.listParts()).toBe("1+2");
});
