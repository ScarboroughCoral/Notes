//实例类
export interface ProductA {
  doA(): string;
}
export interface ProductB {
  doB(): string;
}
export class ProductA1 implements ProductA {
  doA(): string {
    return "A1";
  }
}
export class ProductA2 implements ProductA {
  doA(): string {
    return "A2";
  }
}

export class ProductB1 implements ProductB {
  doB(): string {
    return "B1";
  }
}

export class ProductB2 implements ProductB {
  doB(): string {
    return "B2";
  }
}

//工厂类
export interface AbstractFactory {
  createProductA(): ProductA;
  createProductB(): ProductB;
}

export class Factory1 implements AbstractFactory {
  createProductA(): ProductA {
    return new ProductA1();
  }
  createProductB(): ProductB {
    return new ProductB1();
  }
}

export class Factory2 implements AbstractFactory {
  createProductA(): ProductA {
    return new ProductA2();
  }
  createProductB(): ProductB {
    return new ProductB2();
  }
}
