import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ["activo", "cancelado"], default: "activo" },
  details: [orderDetailSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);