import express from "express"
import {getAllUsers,registerNewAdmin} from "../controllers/userController.js"
import { isAuthenticated, authorizedRoles} from  "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/all", isAuthenticated , authorizedRoles("Admin"),getAllUsers);

router.post("/add/new-admin",isAuthenticated,authorizedRoles("Admin"),registerNewAdmin);


export default router;