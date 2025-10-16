import express from 'express'

import { PageController } from '../controller/pageController.js'
import { AuthMiddleware } from '../middleware/authMiddleware.js'

const pageRoutes = express.Router()

const pageController = new PageController()
const authMiddleware = new AuthMiddleware()

pageRoutes.get('/', (req, res) => pageController.renderHomePage(req, res))
pageRoutes.get('/login', (req, res) => pageController.renderLoginPage(req, res))
pageRoutes.get('/register', (req, res) => pageController.renderRegisterPage(req, res))

pageRoutes.get('/index', authMiddleware.authenticate, (req, res) => pageController.renderIndexPage(req, res))

export default pageRoutes