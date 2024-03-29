import express from "express";
import { logIn, logOut, signUp } from "../controller/auth.controller.js";
const routes = express.Router();

routes.post("/signup", signUp);
routes.post("/login", logIn);
routes.post("/logout", logOut);

export default routes;
