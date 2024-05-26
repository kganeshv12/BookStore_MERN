import express from 'express';

const router = express.Router();

// import { Book } from './models/bookModel.js' ;
// import { Book } from "./models/bookModel.js";
import { Book } from "../models/bookModel.js";


// Route for save a  new book

router.post('/', async (req, res) => {
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


// route to get all the books
router.get('/', async (req, res) => {
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


// router.get('/:name', async (req,res) => {
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


router.get('/:id', async (req,res) => {
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

// app.put('/books/:id/:name', async (req,res) => {
//     try{
//         const {id} = req.params;
//         const {name} = req.params;
//         const book = await Book.findByIdAndUpdate(id, {name: name});
//     }catch(error){
//         console.log(error.message);
//         res.status(500).send({message: error.message});
//     }
// })

router.put('/:id', async (req,res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        )
        {
            return res.status(400).send({message: 'Send all required fields title, author and publishYear'});
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).send({message: 'Book not found'});
        }
        return res.status(200).send({message : 'Book updated Successfully!'});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})


// Delete a BOOK

router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).send({message:'Book not found'});
        }
        return res.status(200).send({message:'Book deleted successfully!'});
    }catch(error){
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})


export default router;