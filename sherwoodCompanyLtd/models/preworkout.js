// db fpor preworjout 

// import 
const mongoose = require('mongoose');

//db
const schemaPreWorkout = {
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
var mongooseSchemaPW = new mongoose.Schema(schemaPreWorkout);

//export
module.exports = mongoose.model('Preworkout', mongooseSchemaPW);