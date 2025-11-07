import express from "express";
const router = express.Router();
import { addBook, getAllBooks, deleteBook } from "../controllers/bookController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { authorizedRoles } from "../middlewares/authMiddleware.js";

router.post("/admin/add", isAuthenticated, authorizedRoles("Admin"), addBook);
router.get("/all", getAllBooks);
router.delete("/delete/:id", isAuthenticated, authorizedRoles("Admin"), deleteBook);

export default router;