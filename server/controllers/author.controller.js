const Author = require('../models/author.model');

// add a new author
module.exports.createAuthor = (req, res) =>{
    Author.create(req.body)
        .then(newAuthor => {
            res.json({results: newAuthor})
        })
        .catch(err =>{
            res.json({msg: "Something went wrong", error: err})
        })
}

// find all authors
module.exports.findAllAuthors = (req, res) => {
    Author.find()
        .then(allAuthors=>{
            res.json({results: allAuthors})
        })
        .catch(err =>{
            res.json({msg: "Something went wrong", error: err})
        })
}

// find a random author
module.exports.findRandomAuthor = (req, res) => {
    // .exec() is just saying execute a function after .count()
    Author.count().exec( (err, count) => {
        let random = Math.floor(Math.random() * count);
        Author.findOne().skip(random)
        .then(ranAuthor => res.json({results: ranAuthor}))
        .catch(err => res.json({msg: 'Something went wrong', error: err}))
    })
}

// find one author
module.exports.findOneAuthor = (req, res) => {
    Author.find({_id: req.params.id})
        .then(oneAuthor => res.json({results: oneAuthor}))
        .catch(err =>{
            res.json({msg: "Something went wrong", error: err})
        })
}

// update a author
module.exports.updateAuthor = (req, res) => {
    Author.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updatedAuthor => {
            res.json({results: updatedAuthor})
        })
        .catch(err =>{
            res.json({msg: "Something went wrong", error: err})
        })
}

// delete a author
module.exports.deleteAuthor = (req, res) =>{
    Author.deleteOne({_id: req.params.id})
        .then(deletedAuthor =>{
            res.json({results: deletedAuthor})
        })
        .catch(err =>{
            res.json({msg: "Something went wrong", error: err})
        })
}