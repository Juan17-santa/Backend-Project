import Product from "../../../domain/entities/Product.js"

export default class CreateProductUseCase {
    constructor (productRepository) {
        this.productRepository = productRepository
    }
    async execute(productData) {
    const { id, name, description, price, stock, category } = productData;

    const product = new Product({
      id,
      name,
      description,
      price,
      stock,
      category,
      createdAt: new Date()
    });

    return await this.productRepository.create(product);
  }
}