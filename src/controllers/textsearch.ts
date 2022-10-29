import { Request, Response } from "express";
import { ElasticSearchTransporter } from "../elasticsearch/transporter";

export class TextSearchController {
  private tranporter: ElasticSearchTransporter;
  constructor(private transporter: ElasticSearchTransporter){
    this.tranporter = transporter;
  }
  public search = async(req: Request, res: Response) => {
    const { text } = req.body;
    const response = await this.tranporter.client.search({
      index: "members",
      query: {
        query_string: {
          query: `*${text}*`,
          fields: ["Name"],
        },
      },
    });

   
    const result = response.hits.hits.map((hit) => hit._source); 
    return res.status(200).json(result)
  }
}
