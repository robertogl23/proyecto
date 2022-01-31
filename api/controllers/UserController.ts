import { User } from '@prisma/client'
import { db } from '../utils/db.server'
import { Request, Response } from 'express'
import UserRegister from '../models/UserRegister'
import type { ICrudController, IResponseApi } from '../interfaces'

class UserController implements ICrudController<User> {
  private static instance: UserController
  private responseApi: IResponseApi<User | User[]> = {
    data: null,
    message: '',
    statusCode: 200,
  }

  // OBTIENE TODOS LOS USUARIOS
  findMany = async (req: Request, res: Response) => {
    try {
      const users: User[] = await db.user.findMany()
      this.responseApi.data = users
      this.responseApi.message = 'Usuarios encontrados'
      this.responseApi.statusCode = 200
    } catch (error) {
      this.responseApi.message = 'Error al obtener los usuarios'
      this.responseApi.statusCode = 500
      this.responseApi.data = null
    } finally {
      res.status(this.responseApi.statusCode).json(this.responseApi)
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
        this.responseApi.data = user
        this.responseApi.message = 'Usuario encontrado'
        this.responseApi.statusCode = 200
      } else {
        this.responseApi.message = 'Usuario no encontrado'
        this.responseApi.statusCode = 404
        this.responseApi.data = null
      }
    } catch (error) {
      this.responseApi.message = 'Error al obtener el usuario'
      this.responseApi.statusCode = 500
      this.responseApi.data = null
    } finally {
      res.status(this.responseApi.statusCode).json(this.responseApi)
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
      this.responseApi.data = updatedUser
      this.responseApi.message = 'Usuario actualizado con exito'
      this.responseApi.statusCode = 200
    } catch (error) {
      this.responseApi.message = 'Error al actualizar el usuario'
      this.responseApi.statusCode = 500
      this.responseApi.data = null
    } finally {
      res.status(this.responseApi.statusCode).json(this.responseApi)
    }
  }

  // ELIMINA UN USUARIO
  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const deletedUser = await db.user.delete({ where: { id } })
      this.responseApi.data = deletedUser
      this.responseApi.message = 'Usuario eliminado con exito'
      this.responseApi.statusCode = 200
    } catch (error) {
      this.responseApi.message = 'Error al eliminar el usuario'
      this.responseApi.statusCode = 500
      this.responseApi.data = null
    } finally {
      res.status(this.responseApi.statusCode).json(this.responseApi)
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
