export class SingletonCounter {
  // TODO:
  private count = 0;
  private static instance: SingletonCounter | null = null;
  private constructor() { }
  public static getInstance() {
    return this.instance ? this.instance : this.instance = new SingletonCounter();
  }
  public inc(): number {
    return ++(SingletonCounter.instance as SingletonCounter).count;
  }
}
