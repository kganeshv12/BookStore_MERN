import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { PORT,mongoDBURL } from "./config.js";
import booksRoutes from "./routes/booksRoutes.js";
import cors from 'cors';

const app = express();

// Middle ware for parsing request body

app.use(express.json());


// MIDDLEWARE FOR HANDLING CORS POLICY
// OPTION 1 : ALLOW ALL ORIGINS
app.use(cors());
// OPTION 2 : ALLOW CUSTOM ORIGINS
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
)

app.get('/', (req,res) => {
    // res.send('Hello World!');
    console.log(req);
    return res.status(234).send("Cool!");
})

app.use('/books', booksRoutes);

// app.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`);
// })



mongoose.connect(mongoDBURL)
    .then(() =>{ 
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        }
    )}
)
    .catch((err) => {
        console.log(err)
    });
