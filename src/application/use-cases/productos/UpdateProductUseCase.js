import Product from "../../../domain/entities/Product.js";

export default class UpdateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, productData) {
    const { name, description, price, stock, category } = productData;

    const product = new Product({
      id,
      name,
      description,
      price,
      stock,
      category
    });

    return await this.productRepository.update(id, product);
  }
}
