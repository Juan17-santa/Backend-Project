export default class Order {
    constructor({ id, userId, total, status, details, createdAt }) {
        this.id = id;
        this.userId = userId;
        this.details = details;
        this.total = this.calcularTotal();
        this.status = status;
        this.createdAt = createdAt;
    }

    calcularTotal() {
        return this.details.reduce((acc, d) => acc + d.subtotal, 0);
    }
}
