import { Client } from "@elastic/elasticsearch";


export class ElasticSearchTransporter {
  public client: Client;
  constructor() {
    this.client = new Client({
      node: "http://localhost:9200",
      maxRetries: 1,
      requestTimeout: 100,
      auth: {
        username: "elastic",
        password: "changeme",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
}