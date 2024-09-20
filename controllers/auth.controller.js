import jwt from "jsonwebtoken"
import { User } from "../models/user.js"
import { generateRefreshToken, generateToken } from "../utils/generateTokens.js"

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({email})
        if(!user) {
            return res.status(403).json({error: 'Credenciales incorrectas'}) 
        }

        const testPassword = await  user.comparePassword(password)
        if(!testPassword) {
            return res.status(403).json({ error: 'Credenciales incorrectas'})
        }

        // Generar JWT
        const {token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res)

        
        /*res.cookie('token', token, {
            httpOnly: true,
            secure: !process.env.MODE==='developer'?false:true
        })*/

        res.json({ token, expiresIn })
    } catch (error) {
        console.log(error.code)
        return res.status(500).json({error: 'Error de servidor'}) 
    }
}

export const register = async (req, res) => {
    const { email, password } = req.body

    try {
        // alternativa 2 con validación
        let testEmail = await User.findOne({email})
        if(testEmail) {
            throw {code: 11000}
        }
        
        const user = new User({ email, password })
        await user.save()

        //jwt token

        return res.status(201).json({ok: true})
    } catch (error) {
        console.log(error.code)
        // alternativa por defecto mongoose
        if(error.code===11000) {
            return res.status(400).json({error: 'El usuario ya está regisrado en el sistema'})
        }
        return res.status(500).json({error: 'Error de servidor'})
    }
    //console.log(req.body);
    //res.json({ ok: 'register' })
}

export const infoUser = async (req, res) => {
    try {
        console.log(req.uid)
        const user = await User.findById(req.uid).lean()
        console.log(user)
        res.json({email: user.email})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Server error'})
    }
    
}

export const refreshToken = (req, res) => {
    
    try {
        
        const refreshTokenCookie = req.cookies.refreshToken
        console.log(refreshTokenCookie)

        if(!refreshTokenCookie) {
            throw new Error('invalid token')
        }    

        const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)
        // Generar JWT
        const {token, expiresIn } = generateToken(uid);

        res.json({ token, expiresIn })
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

export const logout = (req, res) => {
    try {
        res.clearCookie('refreshToken')
        res.end()

    } catch (error) {
        console.error(error)
    }
}