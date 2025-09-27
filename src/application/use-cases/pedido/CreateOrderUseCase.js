import Order from "../../../domain/entities/Order.js";

export default class CreateOrderUseCase {
  constructor(orderRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  async execute(userId, details) {
    if (!Array.isArray(details) || details.length === 0) {
      throw new Error("El pedido debe tener al menos un detalle válido");
    }
    const orderDetails = [];

    for (const detail of details) {
      const product = await this.productRepository.findById(detail.productId);
      if (!product) throw new Error("Producto no encontrado");

      if (product.stock < detail.quantity)
        throw new Error(`Stock insuficiente para ${product.name}`);

      const subtotal = detail.quantity * product.price;

      orderDetails.push({
        productId: product.id,
        quantity: detail.quantity,
        unitPrice: product.price,
        subtotal
      });

      product.stock -= detail.quantity;
      await this.productRepository.update(product.id, product);
    }

    const total = orderDetails.reduce((acc, d) => acc + d.subtotal, 0);

    const order = new Order({
      userId,
      total,
      status: "activo",
      createdAt: new Date(),
      details: orderDetails
    });

    return await this.orderRepository.create(order);
  }
}
