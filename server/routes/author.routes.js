const AuthorController = require('../controllers/author.controller');

// ***** ROUTES *****
module.exports = app => {
    console.log("here");
    app.get('/api/authors', AuthorController.findAllAuthors);
    app.post('/api/authors', AuthorController.createAuthor);
    app.get('/api/authors/random', AuthorController.findRandomAuthor);
    app.get('/api/authors/:id', AuthorController.findOneAuthor);
    app.put('/api/authors/:id', AuthorController.updateAuthor);
    app.delete('/api/authors/:id', AuthorController.deleteAuthor);

}