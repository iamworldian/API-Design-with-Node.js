import express from "express";
import morgan from "morgan";
import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => {
  res.json({ message: "Hello from root" });
});

app.use("/api", protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

app.use("*", (req, res) => {
  res.json({ message: "route not found error" });
});

export default app;
