import axios from "axios"
import https from "https"
import { body, param, validationResult } from "express-validator"

const agent = new https.Agent({
    rejectUnauthorized: false,
  })

export const validationResultsExpress = (req, res, next) => {
    const errors = validationResult(req)
    //console.log(errors)
    
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const paramLinkValidator = [
    param('id', 'Invalid format (expressValidator')
        .trim()
        .notEmpty()
        .escape(),
        validationResultsExpress
]

export const bodyLinkValidator = [
    body('longLink', 'formato link incorrecto').trim().notEmpty().custom(async value => {
        let notHttps = false
        try {
            if(!value.startsWith('https://')) {
                notHttps = true;
                throw new Error('notHttps')
            }            
            await axios.get(value, {
                httpsAgent: agent,
              }) 
            return value           
        } catch (error) {
            console.error(error)
            throw new Error(notHttps?'Invalid link (only https links)':'Invalid link (not found 404)')
        }
    }),
    validationResultsExpress
]