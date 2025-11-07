
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true
    },
    author: {  // fix typo from 'auther' → 'author'
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    availability: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Correct way to create the model
const Book = mongoose.model("Book", bookSchema);

export default Book;
