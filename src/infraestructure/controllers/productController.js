import CreateProductUseCase from "../../application/use-cases/productos/CreateProductUseCase.js";
import GetProductsUseCase from "../../application/use-cases/productos/GetProductsUseCase.js";
import GetProductByIdUseCase from "../../application/use-cases/productos/GetProductByIdUseCase.js";
import UpdateProductUseCase from "../../application/use-cases/productos/UpdateProductUseCase.js";
import DeleteProductUseCase from "../../application/use-cases/productos/DeleteProductUseCase.js";
import ProductRepositoryMongo from "../repositories/ProductRepositoryMongo.js";

const productRepository = new ProductRepositoryMongo();

export const createProduct = async (req, res) => {
    try {
        const useCase = new CreateProductUseCase(productRepository);
        const product = await useCase.execute(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProducts = async (req, res) => {
    try {
        const useCase = new GetProductsUseCase(productRepository);
        const products = await useCase.execute();
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getProductById = async (req, res) => {
    try {
        const UseCase= new GetProductByIdUseCase(productRepository)
        const product = await UseCase.execute(req.params.id)
        if (!product) return res.status(404).json({ message: "Producto no encontrado"})
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export const updateProduct = async (req, res) => {
    try {
        const UseCase = new UpdateProductUseCase(productRepository)
        const product = await UseCase.execute(req.params.id, req.body)
        if(!product) return res.status(404).json({ message: "Producto no encontrado" })
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const UseCase = new DeleteProductUseCase(productRepository)
        const result = await UseCase.execute(req.params.id)
        if(!result) return res.status(404).json({ message: "Producto no encontrado" })
        res.json({ message: "Producto eliminado exitosamente. "})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}