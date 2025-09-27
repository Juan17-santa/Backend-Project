import OrderModel from "../db/OrderModel.js"

class OrderRepositoryMongo {
  async create(orderData) {
    const order = new OrderModel(orderData);
    return await order.save();
  }

  async findAll() {
    return await OrderModel.find()
    .select("-details")
    .populate("userId");
  }

  async findById(id) {
    return await OrderModel.findById(id).populate("userId").populate("details.productId");
  }

  async update(id, order) {
    return await OrderModel.findByIdAndUpdate(id, order, { new: true });
  }
}

export default OrderRepositoryMongo;
