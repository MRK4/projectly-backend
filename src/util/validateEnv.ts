import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  PORT: port(),
  MONGO_URL: str(),
  SESSION_SECRET: str(),
  CLIENT_URL: str(),
});
