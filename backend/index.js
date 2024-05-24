import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { PORT,mongoDBURL } from "./config.js";

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    // res.send('Hello World!');
    console.log(req);
    return res.status(234).send("Cool!");
})

// app.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`);
// })

// route for save a  new book

app.post('/books', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        )
        {
            return res.status(400).send({message: 'Send all required fields title, author and publishYear'});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message});
    }

})

app.get('/books', async (req, res) => {
    try{
        const book = await Book.find({});
        return res.status(200).json({
            count: book.length,
            data: book
        });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})


// app.get('/books/:name', async (req,res) => {
//     try{
//         const input_name = req.params.name;
//         const book = await Book.find({title: input_name});
//         return res.status(200).json({
//             count: book.length,
//             data: book
//         })

//     }catch(error){
//         console.log(error.message);
//         res.status(500).send({message: error.message});
//     }
// })


app.get('/books/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book)

    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

// Updating a book

app.put('/books/:id/:name', async (req,res) => {
    try{
        const {id} = req.params;
        const {name} = req.params;
        const book = await Book.findByIdAndUpdate(id, {name: name});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})


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
