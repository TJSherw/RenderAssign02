// db fpor Creatine 

// import 
const mongoose = require('mongoose');

//db
const schemaCreatine = {
    product: {
        type: String, 
        required: true
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
};

// create obj
var mongooseSchemaC = new mongoose.Schema(schemaCreatine);

//export
module.exports = mongoose.model('Creatine', mongooseSchemaC);