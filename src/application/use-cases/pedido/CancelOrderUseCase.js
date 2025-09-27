export default class CancelOrderUseCase {
  constructor(orderRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  async execute(orderId) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new Error("Pedido no encontrado");
    if (order.status === "cancelado") throw new Error("El pedido ya fue cancelado");

    // Devolver stock
    for (const detail of order.details) {
      const product = await this.productRepository.findById(detail.productId);
      if (product) {
        product.stock += detail.quantity;
        await this.productRepository.update(product.id, product);
      }
    }

    // Cambiar status del pedido
    order.status = "cancelado";
    return await this.orderRepository.update(orderId, order);
  }
}