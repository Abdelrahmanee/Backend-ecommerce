
import express from 'express'
import morgan from 'morgan'
import v1Router from './routers/v1.routes.js'
import { AppError } from './utils/error.handel.js'

const bootstrap = (app) => {
    app.use(express.json())

    app.use(morgan('dev'))
    app.use('/api/v1', v1Router)

    app.all('*', (req, res, next) => {
		throw new AppError('Route not found', 404)
	})

    app.use((err , req, res,next)=>{
        const {stack , status , message}= err
        
        res.status(status || 500).json({message , ...(process.env.MODE === 'development'  &&{stack})})
    })
}

export default bootstrap