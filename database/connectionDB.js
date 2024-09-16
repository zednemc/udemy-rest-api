
import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION) 
    console.log('MongoDB database connected')
} catch (error) {
    console.error('Error de conexión a mongodb: ' + error)
}

