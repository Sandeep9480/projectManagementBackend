import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(projectRoutes);
app.use(userRoutes);

const Port = process.env.PORT || 400;

main()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("Something went Wrong", error);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
app.listen(Port, () => {
  console.log(`Server is running at port ${Port}`);
});
