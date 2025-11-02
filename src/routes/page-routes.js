import express from 'express'

import { PageController } from '../controller/pageController.js'
import { AuthMiddleware } from '../middleware/authMiddleware.js'

const pageRoutes = express.Router()

// Dependency Injection
const pageController = new PageController()

// Middleware
const authMiddleware = new AuthMiddleware()

// Routes
pageRoutes.get('/', (req, res) =>
  pageController.renderHomePage(req, res))
pageRoutes.get('/login', (req, res) =>
  pageController.renderLoginPage(req, res))
pageRoutes.get('/register', (req, res) =>
  pageController.renderRegisterPage(req, res))

pageRoutes.get('/index',
  (req, res, next) => authMiddleware.authenticate(req, res, next),
  (req, res) => pageController.renderIndexPage(req, res)
)

export default pageRoutes