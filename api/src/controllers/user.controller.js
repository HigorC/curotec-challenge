
import userService from "../services/user.service.js"

export async function getAllUsers(req, res) {
    const users = await userService.getAllUsers()
    res.json(users)
}

export async function createUser(req, res, next) {
    try {
        const { email } = req.body
        const user = await userService.createUser({ email })
        res.json({
            message: "user created",
            user
        })
    } catch (error) {
        next(error)
    }
}

export async function createTodo(req, res, next) {
    try {
        const { title } = req.body
        const { userId } = req.params
        const user = await userService.createTodo({ userId, title })

        res.json({
            message: "todo created",
            user
        })
    } catch (error) {
        next(error)
    }
}

export async function updateTodo(req, res, next) {
    try {
        const { userId, todoId } = req.params
        const { title, done } = req.body
        const user = await userService.updateTodo({ userId, todoId, title, done })

        res.json({
            message: "todo updated",
            user
        })
    } catch (error) {
        next(error)
    }
}

export async function deleteTodo(req, res, next) {
    try {
        const { userId, todoId } = req.params
        const user = await userService.deleteTodo({ userId, todoId })

        res.json({
            message: "todo removed",
            user
        })
    } catch (error) {
        next(error)
    }
}