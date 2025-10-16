import express from 'express'

import { AuthenticateController } from '../controller/AuthenticateController.js'
import { AuthService } from '../authMiddleware/AuthService.js'
import { UserRepository } from '../models/UserRepository.js'

const authRoutes = express.Router()

const userRepository = new UserRepository()
const authService = new AuthService(userRepository)
const authController = new AuthenticateController(authService)

authRoutes.post('/register', (req, res) => authController.handleRegister(req, res))

export default authRoutes
