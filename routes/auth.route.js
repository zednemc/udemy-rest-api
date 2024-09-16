import express from 'express'
import { login, register } from '../controllers/auth.controller.js';
import {body} from 'express-validator'
import { validationResultsExpress } from '../middlewares/validationResults.js';

const autRouter = express.Router();

autRouter.post('/login', [
    body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),
    body('password', "Mínimo 6 caracteres").trim().isLength({min: 6}),
    ], 
    validationResultsExpress,
    login)

autRouter.post('/register', [
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



export default autRouter;