import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();

//for configuration of middlewares
app.use(cors({
    //who can access our database
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

//for json file
app.use(express.json({limit: "16kb"}));
//url encoding
app.use(express.urlencoded({extended: true, limit: "16kb"}));
//to store img or other on server publicly
app.use(express.static("public"));
//to manipulate user cookie or to store server cookie
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.route.js";

//routes declaration
app.use("/api/v1/users", userRouter);

//  http://localhost:8000/api/v1/users/signUp
export { app }