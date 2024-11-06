import "dotenv/config";
import express from "express";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import cors from "cors";

// Routes import
import userRoutes from "./routes/users";
import teamRoutes from "./routes/teams";
import projectRoutes from "./routes/projects";
import tasksRoutes from "./routes/tasks";

const app = express();

// Middlewares
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    name: "sid", // the name of the cookie that will store the session ID
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      httpOnly: true,
      secure: true, // Set secure to true only in production
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_URL,
    }),
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", tasksRoutes);

app.get("/api", (req, res) => {
  res.send("The API is working!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
