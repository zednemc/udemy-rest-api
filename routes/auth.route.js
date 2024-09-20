import {Router} from 'express'
import { infoUser, login, logout, refreshToken, register } from '../controllers/auth.controller.js';
import {body} from 'express-validator'
import { validationResultsExpress } from '../middlewares/validationResults.js';
import { requireToken } from '../middlewares/requireToken.js';

const authRouter = Router();

authRouter.post('/login', [
    body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),
    body('password', "Mínimo 6 caracteres").trim().isLength({min: 6}),
    ], 
    validationResultsExpress,
    login)

authRouter.post('/register', [
    body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),
    body('password', "Mínimo 6 caracteres").trim().isLength({min: 6}),
    body('password', 'Formato de password incorrecto').custom((value, {req}) => {        
        if(value !== req.body.repassword) {
            throw new Error('No coinciden las passwords')
        }
        return value;
    })
    ], 
    validationResultsExpress, 
    register)

authRouter.get('/protected', [requireToken], infoUser)
authRouter.get('/refresh', refreshToken)
authRouter.get('/logout', logout)

export default authRouter;