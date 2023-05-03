import express from 'express';
import dotenv from "dotenv";
import TokenRouter from "./routes/token"

dotenv.config({path: "./.env"})

const app = express();

app.use(express.json());
app.use("/api/users", TokenRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`✨ listening on port ${PORT} 🚀`);
});