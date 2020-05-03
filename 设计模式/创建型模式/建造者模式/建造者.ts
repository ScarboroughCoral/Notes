//实体类
export interface Product {
  listParts(): string;
  addParts(part: number): void;
}

export class Product1 implements Product {
  private parts: number[] = [];
  listParts(): string {
    return this.parts.join("-");
  }
  addParts(part: number): void {
    this.parts.push(part);
  }
}
export class Product2 implements Product {
  private parts: number[] = [];
  listParts(): string {
    return this.parts.join("+");
  }
  addParts(part: number): void {
    this.parts.push(part);
  }
}

export interface Builder {
  reset(): void;
  buildStep1(): Builder;
  buildStep2(): Builder;
  buildStep3(): Builder;
  getResult(): Product;
}

export class Builder1 implements Builder {
  private result: Product = new Product1();
  reset(): void {
    this.result = new Product1();
  }
  buildStep1(): Builder {
    this.result.addParts(1);
    return this;
  }
  buildStep2(): Builder {
    this.result.addParts(2);
    return this;
  }
  buildStep3(): Builder {
    this.result.addParts(3);
    return this;
  }
  getResult(): Product {
    let res = this.result;
    this.reset();
    return res;
  }
}

export class Builder2 implements Builder {
  private result: Product = new Product2();
  reset(): void {
    this.result = new Product2();
  }
  buildStep1(): Builder {
    this.result.addParts(1);
    return this;
  }
  buildStep2(): Builder {
    this.result.addParts(2);
    return this;
  }
  buildStep3(): Builder {
    this.result.addParts(3);
    return this;
  }
  getResult(): Product {
    let res = this.result;
    this.reset();
    return res;
  }
}
type BuilderType = "simple" | "normal";
export class Director {
  constructor(private builder: Builder) {
    this.builder = builder;
  }
  changeBuilder(builder: Builder) {
    this.builder = builder;
  }
  make(type: BuilderType): Product {
    switch (type) {
      case "normal":
        this.builder.buildStep1().buildStep2();
      case "simple":
        this.builder.buildStep3();
        break;
      default:
    }
    return this.builder.getResult();
  }
}
