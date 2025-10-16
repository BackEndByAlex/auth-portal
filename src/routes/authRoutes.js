import express from 'express'

import { RegisterController } from '../controller/RegisterController.js'
import { LoginController } from '../controller/loginController.js'

import { RegisterService } from '../authMiddleware/registerService.js'
import { LoginService } from '../authMiddleware/loginService.js'

import { UserRepository } from '../models/UserRepository.js'


const authRoutes = express.Router()

const userRepository = new UserRepository()
const registerService = new RegisterService(userRepository)
const loginService = new LoginService(userRepository)

const loginController = new LoginController(loginService)
const registerController = new RegisterController(registerService)

authRoutes.post('/register', (req, res) => registerController.handleRegister(req, res))
authRoutes.post('/login', (req, res) => loginController.handleLogin(req, res))

export default authRoutes
