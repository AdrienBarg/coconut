const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.hf5ch.mongodb.net/coco?retryWrites=true&w=majority',
    {

    })
    .then( () => console.log('Connected to MongoDB'))
    .catch ( (err) => console.log('Failed to connect to MongoDB', err));