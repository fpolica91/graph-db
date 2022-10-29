import express from "express";
import cors from "cors";
import EmployeeController from "./controllers/employee";

const startApp = async () => {
  const app = express();
  app.use(cors({
    origin: ['http://localhost:5173']
  }));
  app.use(express.json());
  const employeeController = new EmployeeController();
  app.post("/suggestions", employeeController.suggestedConnection);
  app.post("/listByIndustry", employeeController.listByIndustry);

  app.listen(5000, () => {
    console.log("Server started on port 3000");
  });
};

startApp();
