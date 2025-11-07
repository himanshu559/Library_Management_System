import express from "express";
const router = express.Router();

import {
  borrowBooks,
  getBorrowedBooksForAdmin,
  returnBorrowBook,
  recordBorrowBook,
} from "../controllers/borrowController.js";
import { authorizedRoles, isAuthenticated } from "../middlewares/authMiddleware.js";

router.post(
  "/record-borrow-book/:id",
  isAuthenticated,
  recordBorrowBook
);

router.get(
  "/borrowed-books-users",
  isAuthenticated,
  authorizedRoles("Admin"),
  getBorrowedBooksForAdmin
);
router.get(
  "/my-borrowed-books",
  isAuthenticated,
  borrowBooks
);

router.put(
  "/return-borrow-book/:bookId",
  isAuthenticated,
  authorizedRoles("Admin"),
  returnBorrowBook
);


export default router;