import mongoose from "mongoose";



const productSchema = new mongoose.Schema(
    {
     name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: [String],
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    brqnd: { type: String, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    description: { type: String, required: true },
    
    },
    {
        timestamps: true
    }
)
const Product = mongoose.model('Product', productSchema)
export default Product