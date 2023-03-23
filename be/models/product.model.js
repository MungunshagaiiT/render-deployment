import mongoose from "mongoose";
import { uuid } from "uuidv4";

const Product = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
  stock_quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  unit_price: {
    type: Number,
    required: true,
  },
  color: {
    type: [String],
    required: true,
  },
});

export default mongoose.model("Product", Product);
