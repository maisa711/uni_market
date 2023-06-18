import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },

});

const Product = models.Product || model("Product", productSchema);

export default Product;

