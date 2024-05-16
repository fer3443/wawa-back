import express from "express";
import { AddUser, LoginUser, UpdateUser } from "../controllers/user.controller";

const router = express.Router();
router.use(express.json());

router.post("/users/add", AddUser);
router.post("/users/login", LoginUser);
router.put('/users/update/:id', UpdateUser)

export default router;
