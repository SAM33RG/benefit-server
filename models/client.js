import mongoose from 'mongoose';
import bcrypt from "bcrypt-nodejs";


const ClientSchema = new mongoose.Schema({
    // username == email

    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },

    name: {
        type: String,
        required: true,
    },
    mobile: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },

    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach'
    },
    
    premium_expiry: Date,
    premium_start: Date,

    weight: Number,
    height: Number,

});

ClientSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, null, null, (err, hash) => {
        if(err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

ClientSchema.methods.comparePassword = function(password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};


export default mongoose.model('Client', ClientSchema);