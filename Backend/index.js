import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();
const MongoDbURI = "mongodb://localhost:27017/TODO";
import notesRoute from "./Routes/Notes.route.js";
import usersRoute from "./Routes/Users.route.js";
import cors from "cors";

dotenv.config();
const Port = process.env.PORT || 3000

// middlewares
app.use(cors());
app.use(express.json());

// connecting to db
mongoose.connect(MongoDbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// routes
app.use("/Notes", notesRoute);
app.use("/User",usersRoute);





app.listen(Port, () => {
    console.log(`listening on port ${Port}`)
})