import express from 'express'

import authRoutes from './authRoutes.js'
import pageRoutes from './Pageroutes.js'

const router = express.Router()

router.use('/', pageRoutes)
router.use('/auth', authRoutes)

export default router