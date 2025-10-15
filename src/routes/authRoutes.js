import express from 'express'

import { AuthenticateController } from '../controller/AuthenticateController.js'

const authRoutes = express.Router()

const authController = new AuthenticateController()

authRoutes.post('/register', (req, res) => authController.handleRegister(req, res))

export default authRoutes
