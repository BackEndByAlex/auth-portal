import express from 'express'

import authRoutes from './authRoutes.js'
import pageRoutes from './pageRoutes.js'

const router = express.Router()

// Combine all routes
router.use('/', pageRoutes)
router.use('/auth', authRoutes)

export default router