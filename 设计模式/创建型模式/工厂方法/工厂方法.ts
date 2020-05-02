interface Product {
  operation(): string;
}

class ProductA implements Product {
  operation() {
    return "product A";
  }
}
class ProductB implements Product {
  operation() {
    return "product B";
  }
}

abstract class Creator {
  public abstract factoryMethod(): Product;
  public someOperation(): string {
    const prod = this.factoryMethod();
    return `created a ${prod.operation()}`;
  }
}

export class CreatorA extends Creator {
  public factoryMethod(): Product {
    return new ProductA();
  }
}

export class CreatorB extends Creator {
  public factoryMethod(): Product {
    return new ProductB();
  }
}
