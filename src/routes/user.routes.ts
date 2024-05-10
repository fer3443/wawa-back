import express from "express";
import { AddUser, LoginUser } from "../controllers/user.controller";

const router = express.Router();
router.use(express.json());

router.post("/users/add", AddUser);
router.post("/users/login", LoginUser);

export default router;
