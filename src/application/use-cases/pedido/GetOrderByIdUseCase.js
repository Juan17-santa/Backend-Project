export default class GetOrderByIdUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id) {
    return await this.orderRepository.findById(id);
  }
}
