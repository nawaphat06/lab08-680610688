import express, { type Request, type Response } from "express";

// import middlewares
import morgan from "morgan";
import invalidJsonMiddleware from "./middlewares/invalidJsonMiddleware.js";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";

// import routes
import studentRouter_v2 from "./routes/studentsRoutes_v2.js";
import studentRouter_v3 from "./routes/studentsRoutes_v3.js";
import courseRouter_v2 from "./routes/coursesRouters_v2.js";
import enrollmentsRouters_v1 from "./routes/enrollmentsRouters_v1.js";
import enrollmentsRouters_v2 from "./routes/enrollmentsRouters_v2.js";

const app = express();
const port = 3000;

// body parser middleware
app.use(express.json());

// logger middleware
app.use(morgan("dev"));
// app.use(morgan("combined"));

// JSON parser middleware
app.use(invalidJsonMiddleware);

// Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("Lecture18 API services");
});

// GET /api/me
app.get("/api/me", (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      fullName: "Nawapat Prompong",
      studentId: "680610688"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again uiui eiei ah",
      error: err,
    });
  }
});

app.use("/api/v2/students", studentRouter_v2);
app.use("/api/v3/students", studentRouter_v3);
app.use("/api/v2/courses", courseRouter_v2);
app.use("/api/v1/enrollments", enrollmentsRouters_v1);
app.use("/api/v2/enrollments", enrollmentsRouters_v2);

// endpoint check middleware
app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

// Export app for vercel deployment
export default app;
