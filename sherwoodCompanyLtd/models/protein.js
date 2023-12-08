// db fpor Protein 

// import 
const mongoose = require('mongoose');

//db
const schemaProtein = {
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
var mongooseSchemaPN = new mongoose.Schema(schemaProtein);

//export
module.exports = mongoose.model('Protein', mongooseSchemaPN);