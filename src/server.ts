import express from "express";
import cors from "cors";
import { Client } from "@elastic/elasticsearch";
import EmployeeController from "./controllers/employee";
import { TextSearchController } from "./controllers/textsearch";
import { ElasticSearchTransporter } from "./elasticsearch/transporter";

const elasticUrl = "http://localhost:9200";
const esclient = new Client({
  node: elasticUrl,
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



const startApp = async () => {
  const app = express();
  app.use(
    cors({
      origin: ["http://localhost:5173"],
    })
  );
  app.use(express.json());

 
  const employeeController = new EmployeeController();
  const textSearchController = new TextSearchController(new ElasticSearchTransporter());
  app.post("/textsearch", textSearchController.search);
  app.post("/suggestions", employeeController.suggestedConnection);
  app.post("/listByIndustry", employeeController.listByIndustry);

  app.listen(3333, () => {
    console.log("Server started on port 3333");
  });
};

startApp();
