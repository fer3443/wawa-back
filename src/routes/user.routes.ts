import express from "express";
import { AddUser, LoginUser, UpdateUser } from "../controllers/user.controller";
import { authenticateToken } from "../helpers/token.helper";
import { AddFavorites, DeleteFavorites } from "../controllers/userProductActions.controller";

const router = express.Router();
router.use(express.json());

router.post("/users/add", AddUser);
router.post("/users/login", LoginUser);
router.put("/users/update/:id", authenticateToken, UpdateUser);
//user actions
router.post('/users/add-favorites/:id', authenticateToken, AddFavorites);
router.put('/users/delete-favorites/:id', authenticateToken, DeleteFavorites);

export default router;
