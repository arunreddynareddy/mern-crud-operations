import express from "express";
import { createUser, getUsers, getUser, updateUser, deleteUser } from "../controller/userController.js";

const route = express.Router();

route.post("/user", createUser);
route.get("/allUsers", getUsers);
route.get("/user/:id", getUser);
route.put("/update/:id", updateUser);
route.delete("/delete/:id", deleteUser);

export default route