import UserController from '../controllers/UserController'
import { Router } from 'express'

const userRouter = Router()
const userController = UserController.getInstance()

// RUTAS
// ENDPOINT /api/user

// OBTIENE TODOS LOS USUARIOS
userRouter.get('/', userController.findMany)

// OBTIENE UN USUARIO POR ID
userRouter.get('/:id', userController.findOne)

// ACTUALIZA UN USUARIO
userRouter.post('/create', userController.create)

// ACTUALIZA UN USUARIO
userRouter.put('/:id', userController.update)

// ELIMINA UN USUARIO
userRouter.delete('/:id', userController.delete)

export default userRouter
