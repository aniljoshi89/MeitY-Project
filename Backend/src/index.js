import connectDB from "./db/index.js";
import dotenv from "dotenv";
import {app} from "./app.js"

dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT || 8000;
//calling database connection function
connectDB()

//after successful connection to DB
.then(() => {
    //if express is not able to connect to Database
    app.on("error", (error) => {
        console.log("Express js connection failed!!", error);
        throw error;
    })
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`)
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed!!!", err);
})