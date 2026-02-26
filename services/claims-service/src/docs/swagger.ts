import path from "path";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export function setupSwagger(app: Express) {
  const specPath = path.join(__dirname, "openapi.yaml");
  const swaggerDocument = YAML.load(specPath);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}