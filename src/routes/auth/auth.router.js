import express from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../../model/User'

const route = () => {
    
    const router = new express.Router();

    router.route('/login').post((req, res) => {

        const { email, password } = req.body;

        User.findOne({ email: email }).then((user) => {

            if(!user) {

                res.send({
                    state: false,
                    message: 'User not found!'
                });
    
            }else {
                
                const token = jwt.sign({ userId: user._id }, config.jwtSecret );

                User.update({ email: email},{
                    $set: {
                        lastLogin: new Date()
                    }
                }).then(()=> {});
    
                if( user.password === crypto.createHmac('sha256', config.passSecret).update(password).digest('hex') ){
                    res.send({
                        state: true,
                        token: token
                    })
                }else {
                        res.send({
                            state: false,
                            message: 'Incorrect password!'
                    });
                }
            } 
        });
    });
    
    router.route('/sign-up').post((req, res) => {

        const { email, password } = req.body;
        
        const hashedPassword = crypto.createHmac('sha256', config.passSecret).update(password).digest('hex');

        const newUser = new User({
            email: email,
            password: hashedPassword
        });

        newUser.save().then(
            (data) => {
                res.send({status: true, user: data});
            },
            
            (err) => {
                res.send({status: false, error: err});
            }
        );
    });

    return router;
}

export default {
    route,
    routePrefix: `/${config.version}/auth`
}