import { app } from "./controllers/user-controller.js";

const PORT = process.env.PORT ?? 3000;

/**
 * this execution method starts the server.
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
