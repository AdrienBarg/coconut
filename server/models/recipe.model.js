const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema(
    {
        /*recipeId: {
            type: String,
            required: true
        },*/
        authorId: {
            type: String,
            required: true
        },
        picture: {
            type: String
        },
        prepTime: {
            type: String
        },
        cookingTime: {
            type: String
        },
        rest: {
            type: String
        },
        category: {
            type: [String],
            required: true
        },
        mouth: {
            type: Number
        },
        ingredients: {
            type: [String],
            required: true
        },
        steps: {
            type: [String],
        }

    },
    {
        timestamps: true,
    }
);

const RecipeModel = mongoose.model('recipe', RecipeSchema);

module.exports = RecipeModel;