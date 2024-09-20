import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'


const userShema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    }
})

userShema.pre('save', async function(next) {
    const user = this;
    
    if(!user.isModified('password')) {        
        return next()
    } 

    try {
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(user.password, salt)        
        user.password= hashPassword
        console.log(user.password)
        next()
    } catch (error) {
        throw new Error('Error en la generaciónb del hash de constraseña.')
    } finally {

    }
});

userShema.methods.comparePassword = async function(candidatePassword) {

    return await bcryptjs.compare(candidatePassword, this.password)

}

export const User = mongoose.model('user', userShema)