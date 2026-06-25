import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(
        ` Server running on port ${env.PORT}`
      );
    });
  } catch (error) {
    console.error("Server Startup Failed");
    console.error(error);
  }
};

startServer();