import { Router, RequestHandler } from 'express';
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const router: Router = Router();

// Explicitly type each route handler
router.get("/", getProducts as RequestHandler);
router.get("/categories", getCategories as RequestHandler);
router.get("/category/:category", getProductsByCategory as RequestHandler);
router.get("/:id", getProductById as RequestHandler);
router.post("/", createProduct as RequestHandler);
router.put("/:id", updateProduct as RequestHandler);
router.delete("/:id", deleteProduct as RequestHandler);

export default router;