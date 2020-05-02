export default class Database {
  private static instance: Database | null = null;
  private constructor() {}
  public static getInstance() {
    return this.instance || (this.instance = new Database());
  }
}
