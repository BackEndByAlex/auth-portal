import express from 'express'

import { RegisterController } from '../controller/RegisterController.js'
import { LoginController } from '../controller/loginController.js'
import { LogoutController } from '../controller/logoutController.js'

import { RegisterService } from '../services/registerService.js'
import { LoginService } from '../services/loginService.js'
import { LogoutService } from '../services/logoutService.js'

import { UserRepository } from '../models/UserRepository.js'

import { RegisterValidationMiddleware } from '../validator/registerValidation.js'
import { LoginValidationMiddleware } from '../validator/loginValidation.js'

import { RegisterAdapterMiddleware } from '../middleware/registerAdapterMiddleware.js'
import { LoginAdapterMiddleware } from '../middleware/loginAdapterMiddleware.js'
import { LogoutAdapterMiddleware } from '../middleware/logoutAdapterMiddleware.js'


const authRoutes = express.Router()

// Dependency Injection - Services
const userRepository = new UserRepository()

const registerService = new RegisterService(userRepository)
const loginService = new LoginService(userRepository)
const logoutService = new LogoutService()

// Dependency Injection - Controllers
const loginController = new LoginController(loginService)
const registerController = new RegisterController(registerService)
const logoutController = new LogoutController(logoutService)

// Dependency Injection - Adapter Middleware
const loginAdapter = new LoginAdapterMiddleware(loginController)
const registerAdapter = new RegisterAdapterMiddleware(registerController)
const logoutAdapter = new LogoutAdapterMiddleware(logoutController)

// Validation Middleware Instances
const registerValidation = new RegisterValidationMiddleware()
const loginValidation = new LoginValidationMiddleware()

// Routes with validation middleware -> adapter middleware
authRoutes.post('/register', 
  (req, res, next) => registerValidation.validate(req, res, next),
  (req, res) => registerAdapter.handle(req, res)
)

authRoutes.post('/login', 
  (req, res, next) => loginValidation.validate(req, res, next),
  (req, res) => loginAdapter.handle(req, res)
)

authRoutes.post('/logout', 
  (req, res) => logoutAdapter.handle(req, res)
)

export default authRoutes