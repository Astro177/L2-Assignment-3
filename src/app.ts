import express, { Application, Request, Response } from "express";
import cors from "cors";
import { CourseRoutes } from "./app/modules/course/course.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";

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
