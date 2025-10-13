import express from 'express'

import { 
  renderHomePage, 
  renderLoginPage, 
  renderRegisterPage,
} from '../controller/pageController.js'

const router = express.Router()

router.get('/', renderHomePage)
router.get('/login', renderLoginPage)
router.get('/register', renderRegisterPage)

export default router