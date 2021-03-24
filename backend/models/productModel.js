import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);


const sizesSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const imageSchema = new mongoose.Schema(
  [
    {
      original: { type: String, required: true },
      thumbnail: { type: String, required: true },
      color: { type: String, required: true },
    },
  ],
  { timestamps: true }
)

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    // seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    image: [[imageSchema]],
    // brand: { type: String, required: true },
    // category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    size: [{
      value: { type: String, required: true },
      quantity: { type: Number, required: true },
    },],
    productID_stripe:{ type: String, required: true },
    skuID_stripe:{ type: String, required: true },
    // numReviews: { type: Number, required: true },
    // reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;
