export default class Singleton {
  private static instance: Singleton;
  private constructor() {}
  public static getInstance() {
    if (this.instance) return this.instance;
    return (this.instance = new Singleton());
  }
}
