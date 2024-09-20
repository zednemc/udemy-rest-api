import jwt from "jsonwebtoken"

// Incluyendo el token en una cookie que siempre lo envia (VULNERABLE)

export const requireTokenInclude = (req, res, next) => {
    try {
        const token = req.cookies?.token
        if(!token) {
            throw new Error('Not (Bearer) authorized')
        }
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        req.uid=uid
        next()
    } catch (error) {

        const TokenVerificationErrors = {
            'jwt expired': 'JWT expirado',
            'jwt malformed': 'Token no válido',
            'invalid signature': 'Signatura no válidad',
            'invalid token': 'Token no válido',
            'Unexpected token': 'Token no válido',
            'Not (Bearer) authorized': 'Utiliza formato Bearer'
        }

        const err = error.message.startsWith('Unexpected token')?'Unexpected token':error.message;

        return res.status(401).json({error: TokenVerificationErrors[err]})
    }
}

export const requireToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization
        if(!token) {
            throw new Error('Not (Bearer) authorized')
        }
        const {uid} = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
        req.uid=uid
        next()
    } catch (error) {

        const TokenVerificationErrors = {
            'jwt expired': 'JWT expirado',
            'jwt malformed': 'Token no válido',
            'invalid signature': 'Signatura no válidad',
            'invalid token': 'Token no válido',
            'Unexpected token': 'Token no válido',
            'Not (Bearer) authorized': 'Utiliza formato Bearer'
        }

        const err = error.message.startsWith('Unexpected token')?'Unexpected token':error.message;

        return res.status(401).json({error: TokenVerificationErrors[err]})
    }
}