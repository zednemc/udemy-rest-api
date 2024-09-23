import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'

const linkShema = mongoose.Schema({
    longLink: {
        type: String,
        required: true,
        trim: true        
    },
    nanoLink: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

/*linkShema.pre('save', async function(next) {
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

linkShema.methods.comparePassword = async function(candidatePassword) {

    return await bcryptjs.compare(candidatePassword, this.password)

}*/

export const Link = mongoose.model('link', linkShema)