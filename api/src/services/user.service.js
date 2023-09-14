import validator from "validator"
import createHttpError from 'http-errors'

import UserModel from '../models/user.model.js'
import mongoose from "mongoose"

/**
 * Returs all users.
 * @returns User[]
 */
export async function getAllUsers() {
    return UserModel.find()
}

/**
 * Create a new user, with the todo list empty
 * @param {email} email to create the user
 * @returns User
 */
export async function createUser(userData) {
    const { email } = userData

    if (!email) {
        throw createHttpError.BadRequest('Please fill all fields.')
    }

    if (!validator.isEmail(email)) {
        throw createHttpError.BadRequest('Please make sure to provide a valid email.')
    }

    const checkDB = await UserModel.findOne({ email })
    if (checkDB) {
        throw createHttpError.Conflict('Email already exists.')
    }

    const user = await new UserModel({
        email,
        todos: []
    }).save()

    return user
}

/**
 * Create a new todo for a passed user
 * @param {*} todoData 
 * @returns User
 */
export async function createTodo(todoData) {
    const { userId, title } = todoData

    const user = await UserModel.findById(userId)

    if (!user) {
        throw createHttpError.NotFound('User not found.')
    }

    if (!title) {
        throw createHttpError.BadRequest('Fill all fields')
    }

    user.todos.push({
        title,
        done: false
    })

    user.save()
    return user

}

/**
 * Updates a especific todo
 * @param {*} todoData 
 * @returns User
 */
export async function updateTodo(todoData) {
    const { userId, todoId, title, done } = todoData

    const user = await UserModel.findById(userId)
    if (!user) {
        throw createHttpError.NotFound('User not found.')
    }

    const indexTodo = user.todos.findIndex(todo => todo._id.equals(new mongoose.Types.ObjectId(todoId)))

    if (indexTodo === -1) {
        throw createHttpError.NotFound('Todo not found.')
    }

    if (title) {
        user.todos[indexTodo].title = title
    }
    if (done !== undefined) {
        user.todos[indexTodo].done = done
    }
    user.save()
    return user
}

/**
 * Deletes a specific todo
 * @param {*} todoData 
 * @returns User
 */
export async function deleteTodo(todoData) {
    const { userId, todoId } = todoData

    const user = await UserModel.findById(userId)
    if (!user) {
        throw createHttpError.NotFound('User not found.')
    }

    const indexTodo = user.todos.findIndex(todo => todo._id.equals(new mongoose.Types.ObjectId(todoId)))
    user.todos.splice(indexTodo, 1)
    user.save()
    return user
}

export default {
    createUser,
    createTodo,
    getAllUsers,
    deleteTodo,
    updateTodo
}