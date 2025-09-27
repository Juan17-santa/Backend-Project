import express from "express";
import { createOrder, getOrders, getOrderById, cancelOrder } from "../controllers/orderController.js";
import { authMiddleware } from "../../interfaces/middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrderById);
router.put("/:id/cancel", authMiddleware, cancelOrder);

export default router;
