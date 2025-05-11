import express from "express";
const router = express.Router();
import * as userController from "../app/controllers/userController.js";
import { singleUpload } from "../app/middlewares/multer.js";
import authMiddleware from "../app/middlewares/authMiddleware.js";


router.post("/register",singleUpload, userController.register);
router.post("/login", userController.login);
router.get("/getMyProfile",authMiddleware, userController.getMyProfile);
router.get("/logout", userController.logout);



export default router;
