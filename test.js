import { analyzeSchema } from "./helpers/analyze-schema.js";

const user = {
  username: "nico"
};

const response = await analyzeSchema(user, 0);
console.log(response);
console.log(response.error.errors);
