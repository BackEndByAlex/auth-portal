import express from 'express'

import { RegisterController } from '../controller/RegisterController.js'
import { AuthService } from '../authMiddleware/AuthService.js'
import { UserRepository } from '../models/UserRepository.js'

const authRoutes = express.Router()

const userRepository = new UserRepository()
const authService = new AuthService(userRepository)
const registerController = new RegisterController(authService)

authRoutes.post('/register', (req, res) => registerController.handleRegister(req, res))

export default authRoutes
