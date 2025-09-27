export default class Product {
    constructor({ id, name, description, price, stock, category, createdAt}) {
        if(!name || name.length < 3) throw new Error('El nombre es obligatorio y debe tener al menos 3 caracteres');
        if(!description || description.length < 10) throw new Error('La descripción es obligatoria y debe tener al menos 10 caracteres');
        if(!price || price < 0) throw new Error('El precio es obligatorio y debe ser mayor a 0');
        if(!stock || stock < 0) throw new Error('El stock es obligatorio y debe ser mayor a 0');
        if(!category) throw new Error('La categoría es obligatoria');

        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.createdAt = createdAt;
    }
}