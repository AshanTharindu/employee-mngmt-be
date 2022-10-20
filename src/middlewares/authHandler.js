import jwt from 'jsonwebtoken';
import { RegisteredEmployee } from '../models/RegisteredEmployee';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await RegisteredEmployee.findOne({ _id: decoded._id })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}