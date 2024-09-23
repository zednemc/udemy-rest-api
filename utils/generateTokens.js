import jwt from "jsonwebtoken"

export const generateToken = (uid) => {
    const expiresIn = 60 * 15 // 15 minutos

    try {
        const token = jwt.sign({uid}, process.env.JWT_SECRET, { expiresIn })
        return {token, expiresIn}
    } catch (error) {
        console.log(error)
    }
}

export const generateRefreshToken = (uid, res) => {

    const expiresIn = 60 * 60 * 24 * 30 // 30 días

    try {
        const refreshToken = jwt.sign({uid}, process.env.JWT_REFRESH, { expiresIn })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODE==='developer'),
            expires: new Date(Date.now() + expiresIn * 1000)         
        })
    } catch (error) {
        console.log(error)
    }
}

export const TokenVerificationErrors = {
    'jwt expired': 'JWT expirado',
    'jwt malformed': 'Token no válido',
    'invalid signature': 'Signatura no válidad',
    'invalid token': 'Token no válido',
    'Unexpected token': 'Token no válido',
    'Not (Bearer) authorized': 'Utiliza formato Bearer'
}