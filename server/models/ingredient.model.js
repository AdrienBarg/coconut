const mongoose = require("mongoose");


const IngredientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        picture: {
            type: String
        }
    }
);

const IngredientModel = mongoose.model('ingredient', IngredientSchema);

module.exports = IngredientModel;