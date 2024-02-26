require('dotenv').config();
import fastify, { FastifyInstance } from "fastify";
import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import mentionedTweetsRoutes from "./routes/mentionedTweetsRoutes";
import timelineRoutes from "./routes/timelineRoutes";
import publicFeedRoutes from "./routes/publicFeedRoutes";
import sequelize from "./config/database";

const app: FastifyInstance = fastify();

// Register Routes
app.register(userRoutes);
app.register(tweetRoutes);
app.register(mentionedTweetsRoutes);
app.register(timelineRoutes);
app.register(publicFeedRoutes);

// Sync Database
sequelize.sync().then(() => {
  console.log("Database synced");
});

// Start Server
app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

export type App = typeof app;
export default app;