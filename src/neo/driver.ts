import neo4j, { Driver } from "neo4j-driver";

export class NeoDriver {
  private static _driver: Driver;
  public static get getDriver() {
    if (!this._driver) {
      this._driver = neo4j.driver(
        "neo4j://localhost",
        neo4j.auth.basic("neo4j", "1234")
      );
    }
    return this._driver;
  }
  static close() {
    this._driver.close();
  }
}
