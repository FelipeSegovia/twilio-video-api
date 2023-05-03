import express from 'express';
import dotenv from "dotenv";
import TokenRouter from "./routes/token"
import cors from "cors";

dotenv.config({path: "./.env"})

const app = express();

app.use(express.json());
app.use(cors())
app.use("/api/users", TokenRouter);

const PORT = process.env.PORT || 3001;

app.use("/", (_, res) => {
    res.json({message: "Welcome"})
})

app.listen(PORT, () => {
    console.log(`✨ listening on port ${PORT} 🚀`);
});