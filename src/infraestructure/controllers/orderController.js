import CreateOrderUseCase from "../../application/use-cases/pedido/CreateOrderUseCase.js";
import GetOrdersUseCase from "../../application/use-cases/pedido/GetOrdersUseCase.js";
import GetOrderByIdUseCase from "../../application/use-cases/pedido/GetOrderByIdUseCase.js";
import CancelOrderUseCase from "../../application/use-cases/pedido/CancelOrderUseCase.js";

import OrderRepositoryMongo from "../../infraestructure/repositories/OrderRepositoryMongo.js";
import ProductRepositoryMongo from "../../infraestructure/repositories/ProductRepositoryMongo.js";

const orderRepository = new OrderRepositoryMongo();
const productRepository = new ProductRepositoryMongo();

export const createOrder = async (req, res) => {
  try {
    const { userId, details } = req.body;  // desestructurar
    const useCase = new CreateOrderUseCase(orderRepository, productRepository);
    const order = await useCase.execute(userId, details);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const useCase = new GetOrdersUseCase(orderRepository);
    const orders = await useCase.execute();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const useCase = new GetOrderByIdUseCase(orderRepository);
    const order = await useCase.execute(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const useCase = new CancelOrderUseCase(orderRepository, productRepository);
    const order = await useCase.execute(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
