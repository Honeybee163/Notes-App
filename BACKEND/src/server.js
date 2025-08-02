import connectDb from "./config/mongoose.js";
import express from "express";
import cors from "cors";
import NoteRoutes from "./routes/NoteRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(NoteRoutes);
let port=process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//connected to db
connectDb();