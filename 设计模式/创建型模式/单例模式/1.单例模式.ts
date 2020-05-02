class Singleton {
  private static instance: Singleton;
  private constructor() {

  }
  public static getInstance() {
    if (this.instance) return this.instance;
    return this.instance = new Singleton();
  }
}

console.log(Singleton.getInstance());
console.log(Singleton.getInstance());

