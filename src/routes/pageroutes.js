import express from 'express'

import { PageController } from '../controller/pageController.js'
import { AuthMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

const pageController = new PageController()

router.get('/', (req, res) => pageController.renderHomePage(req, res))
router.get('/login', (req, res) => pageController.renderLoginPage(req, res))
router.get('/register', (req, res) => pageController.renderRegisterPage(req, res))

router.get('/index', AuthMiddleware.authenticate, (req, res) => pageController.renderIndexPage(req, res))

export default router