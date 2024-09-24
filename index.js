import 'dotenv/config'
import './database/connectionDB.js'
import express from 'express' 
import cors from 'cors'
import authRouter from './routes/auth.route.js';
import linkRouter from './routes/link.router.js';
import redirectRouter from './routes/redirect.route.js'
import cookieParser from 'cookie-parser';

const whiteList = [process.env.ORIGIN1]

const app = express();

app.use(
    cors({
        origin: function(origin, callback) {
            console.log(whiteList, origin)
            if(whiteList.includes(origin)) {
                return callback(null, origin)
            }
            return callback(`CORS ERROR: ${origin} not authorized`)
        }
    })
)

app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/links', linkRouter)

// ejemplo redirección en backenb
app.use('/', redirectRouter)

// Solo ejemplo de login, no forma parte del API de backend
app.use(express.static('public'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`running on port ${PORT}`))