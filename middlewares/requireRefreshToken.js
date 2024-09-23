import jwt from "jsonwebtoken"
import { TokenVerificationErrors } from "../utils/generateTokens.js"

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken
        console.log('refreshTokenCookie', refreshTokenCookie)

        if(!refreshTokenCookie) {
            throw new Error('invalid token')
        }    

        const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)
        req.uid=uid
        console.log('uid', uid)
        next()

    } catch (error) {
        console.error(error)
        const err = error.message.startsWith('Unexpected token')?'Unexpected token':error.message;
        res.status(401).json({error: TokenVerificationErrors[err]})
    }
}