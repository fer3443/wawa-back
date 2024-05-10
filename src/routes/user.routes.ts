import express from "express";
import { AddUser } from "../controllers/user.controller";

const router = express.Router();
router.use(express.json());

router.post('/users/add',AddUser);

export default router;