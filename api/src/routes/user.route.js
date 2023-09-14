import express from "express"
import trimRequest from "trim-request"
import { getAllUsers, createUser, createTodo, deleteTodo, updateTodo } from "../controllers/user.controller.js"

const router = express.Router()

router.route("").get(trimRequest.all, getAllUsers)
router.route("").post(trimRequest.all, createUser)
router.route("/:userId/todos").post(trimRequest.all, createTodo)
router.route("/:userId/todos/:todoId").delete(trimRequest.all, deleteTodo)
router.route("/:userId/todos/:todoId").put(trimRequest.all, updateTodo)

export default router;