import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import interviewRoutes from "./routes/interview.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/interview", interviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
