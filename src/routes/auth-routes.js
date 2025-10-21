import express from 'express'

import { RegisterController } from '../controller/registerController.js'
import { LoginController } from '../controller/loginController.js'
import { LogoutController } from '../controller/logoutController.js'

import { RegisterService } from '../services/registerService.js'
import { LoginService } from '../services/loginService.js'
import { LogoutService } from '../services/logoutService.js'

import { UserRepository } from '../models/UserRepository.js'


const authRoutes = express.Router()

// Dependency Injection
const userRepository = new UserRepository()

const registerService = new RegisterService(userRepository)
const loginService = new LoginService(userRepository)
const logoutService = new LogoutService()

const loginController = new LoginController(loginService)
const registerController = new RegisterController(registerService)
const logoutController = new LogoutController(logoutService)

// Routes
authRoutes.post('/register', (req, res) => 
  registerController.handleRegister(req, res))
authRoutes.post('/login', (req, res) => 
  loginController.handleLogin(req, res))
authRoutes.post('/logout', (req, res) => 
  logoutController.handleLogout(req, res))

export default authRoutes
