import 'dotenv/config'
import './database/connectionDB.js'
import express from 'express' 
import autRouter from './routes/auth.route.js';

const app = express();

app.use(express.json())
app.use('/api/v1', autRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`running on port ${PORT}`))