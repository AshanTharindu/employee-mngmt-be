import jwt from 'jsonwebtoken';
import { RegisteredEmployee } from '../models/RegisteredEmployee';

/**
 * Authenticate middleware
 * Verify the JWT token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await RegisteredEmployee.findOne({ _id: decoded._id })

        if (!user) {
            throw new Error('User not found')
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}