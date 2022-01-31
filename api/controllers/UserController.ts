import { User } from '@prisma/client'
import { db } from '../utils/db.server'
import { Request, Response } from 'express'
import UserRegister from '../models/UserRegister'
import type { ICrudController, IResponseApi } from '../interfaces'

class UserController implements ICrudController<User> {
  private static instance: UserController
  private responseApi: IResponseApi<User> = {
    data: null,
    message: '',
    statusCode: 200,
  }
  // OBTIENE TODOS LOS USUARIOS
  findMany = async (req: Request, res: Response) => {
    try {
      const users: User[] = await db.user.findMany()
      res.json(users)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener todos los usuarios' })
    }
  }

  // OBTIENE UN USUARIO POR ID
  findOne = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const user: User | null = await db.user.findUnique({
        where: { id },
      })
      if (user) {
        res.json(user)
      } else {
        res
          .status(404)
          .json({ message: 'No se encontro usuario con el id ' + id })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar usuario por id' })
    }
  }

  // CREA NUEVO USUARIO
  create = async (req: Request, res: Response) => {
    const user: User = req.body
    try {
      const newUser = await UserRegister.getInstance().register(user)
      this.responseApi.data = newUser
      this.responseApi.message = 'Usuario creado con exito'
      this.responseApi.statusCode = 201
    } catch (error) {
      this.responseApi.message = 'Error al crear usuario'
      this.responseApi.statusCode = 500
      this.responseApi.data = null
    } finally {
      res.status(this.responseApi.statusCode).json(this.responseApi)
    }
  }

  // ACTUALIZA UN USUARI
  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const user: User = req.body
      const updatedUser = await db.user.update({
        where: { id },
        data: user,
      })
      res.json(updatedUser)
    } catch (error) {
      res.status(500).json({ message: 'Error' })
    }
  }

  // ELIMINA UN USUARIO
  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const deletedUser = await db.user.delete({ where: { id } })
      res.json(deletedUser)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error al eliminar usuario con el id ' + id })
    }
  }

  // INSTANCIA DEL CONTROLADOR
  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController()
    }
    return UserController.instance
  }
}

export default UserController
