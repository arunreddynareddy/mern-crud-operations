import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import cors from "cors";

import route from "./routes/userRoute.js";

const app = express();
app.use(bodyparser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 4002;
const MONGOURL = process.env.MONGO_URL;

mongoose
.connect(MONGOURL)
.then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    })
})
.catch((error) => {
    console.log(error)
})

app.use("/api", route);
