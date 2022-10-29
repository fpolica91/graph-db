import { NeoDriver } from "../neo/driver";
import { Request, Response } from "express";

export default class EmployeeController {
  private driver: NeoDriver;
  constructor() {
    this.driver = new NeoDriver();
  }
  async suggestedConnection(req: Request, res: Response) {
    const { industry: industry } = req.body;

    const session = NeoDriver.getDriver.session({});
    const response = await session.executeRead((tx) =>
      tx.run(`MATCH(n:Employee) where n.industry = $param return n`, {
        param: industry,
      })
    );
    
    const result = response.records
      .map((row) => row.get("n"))
      .map((node) => new Map(Object.entries(node.properties)))
      .map((user) => ({
        id: user.get("employeeId"),
        unit: user.get("unit"),
        gender: user.get("gender"),
        name: user.get("name"),
        sector: user.get("industry"),
        country: user.get("Country"),
        title: user.get("title"),
        age: Number(user.get("age")),
        ethnnicity: user.get("Ethnicity"),
      }));
    // console.log(result);
    return res.status(200).send(JSON.stringify(result));
  }

  async listByIndustry(req: Request, res: Response) {
    const session = NeoDriver.getDriver.session({});
    const { industry: industry } = req.body;
    const response = await session.executeRead((tx) =>
      tx.run(
        `MATCH (e:Employee)-[:EXPERIENCE]->(c)
          where c.name = $param
          RETURN
          c.name as sector,
          e.employeeId as id,
          e.name as name, 
          e.city as city, 
          e.Country as country, 
          e.age as age,
          e.title as title
          ;`,
        {
          param: industry,
        }
      )
    );  
    const result = response.records
                   .map((row) => {
                      return {
                        id: row.get("id"),
                        sector: row.get("sector"),
                        name: row.get("name"),
                        age: Number(row.get("age")),
                        city: row.get("city"),
                        country: row.get("country"),
                        title: row.get("title"),
                      };
                   })

    return res.status(200).json(result)
  }
}
