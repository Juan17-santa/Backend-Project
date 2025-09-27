import express from "express";
import cors from "cors"
import userRoutes from "../infraestructure/routes/userRoutes.js";
import loginRoutes from "../infraestructure/routes/loginRoutes.js"
import productRoutes from "../infraestructure/routes/productRoutes.js"
import orderRoutes from "../infraestructure/routes/orderRoutes.js"

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/auth/register", userRoutes);
app.use("/api/auth/login", loginRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

export default app;