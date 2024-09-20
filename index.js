import 'dotenv/config'
import './database/connectionDB.js'
import express from 'express' 
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/auth', authRouter)

// Solo ejemplo de login, no forma parte del API de backend
app.use(express.static('public'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`running on port ${PORT}`))