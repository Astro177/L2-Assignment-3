import express, { Application, Request, Response } from "express";
import cors from "cors";
import { CourseRoutes } from "./app/modules/course/course.route";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", CourseRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    status: "connected",
    message: "Welcome to Our Courses!",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
