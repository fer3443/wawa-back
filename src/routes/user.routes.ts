import express from "express";
import { AddUser, LoginUser, UpdateUser } from "../controllers/user.controller";
import { authenticateToken } from "../helpers/token.helper";

const router = express.Router();
router.use(express.json());

router.post("/users/add", AddUser);
router.post("/users/login", LoginUser);
router.put("/users/update/:id", authenticateToken, UpdateUser);

export default router;
