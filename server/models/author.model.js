const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Author's name is required!"],
        minlength: [3, 'Name must be at least 3 characters']
    }, 

    isBestSeller: {
        type: Boolean,
    }
})

const Author = mongoose.model('Author', AuthorSchema)

module.exports = Author;