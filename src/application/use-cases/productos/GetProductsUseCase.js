export default class GetProductsUseCase {
    constructor (productRepository) {
        this.productRepository = productRepository
    }
    async execute () {
        return await this.productRepository.findAll()
    }
}