import express from 'express'

import authRoutes from './auth-routes.js'
import pageRoutes from './page-routes..js'

const router = express.Router()

// Combine all routes
router.use('/', pageRoutes)
router.use('/auth', authRoutes)

export default router