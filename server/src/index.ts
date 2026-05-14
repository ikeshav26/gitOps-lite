import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials:true
}))

const port = process.env.PORT || 4000 ;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/", (req, res) => {
  res.send("testing api is working...");
  console.log("Response sent");
});

app.get("/api/data", (req, res) => {
  const data = {
    message: "Api is working completely fine...",
    timestamp: new Date(),
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});