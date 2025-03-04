// 3rd party modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// custom modules
import generalRoutes from "./routes/general.js";

const app = express();

// load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, { dbName: process.env.DB_NAME });

app.use(bodyParser.json());

app.use("/api", generalRoutes);

// not found route
app.use((req, res) => {
  res.status(404).json({ message: "Not found", statusCode: 404 });
});

// error route
app.use((error, req, res, next) => {
  res.status(500).json({ message: "Internal server error", statusCode: 500 });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
