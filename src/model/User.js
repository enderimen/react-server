import mongosee from 'mongoose';

const Schema = mongosee.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Please, enter your adress"]
    },
    password: String,
    dateCreated: {
        type: Date,
        default: new Date() 
    },
    dateModified: {
        type: Date,
        default: new Date() 
    },
    lastLogin: {
        type: Date,
        default: new Date() 
    }
});

export default mongosee.model('User', userSchema);