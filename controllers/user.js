const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const User = require('../models/user')
const jwt = require('jsonwebtoken')
module.exports = {
    userGetAll: (req, res) => {
        User.find()
        .then(results => {
            console.log(results)
            res.status(200).json({
            email: results.map(result => {
                return {
                    _id: result.id,
                    email: result.email
                }
            }
                )
            })
        })
    },
    userSignUp: (req, res, next) => {
        User.find({email: req.body.email})
        .then(user => {
            if(user.length >= 1){
                return res.status(409).json({
                    message: 'Mail existed'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            email: req.body.email,
                            password: hash
                            })
                            user
                            .save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                message: 'User Created'
                            })
                        })
                            .catch(err =>  res.status(500).json({error: err}))
                    }
                })
            }
        });
    },
    userSignIn: (req, res) => {
        User.find({email: req.body.email})
        .then(user => {
            if(user.length < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if(result){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 'secret', 
                    {
                        expiresIn: "1h"
                    }
                    );
                    return res.status(200).json({
                        message: 'Auth successfuly',
                        token: token
                    })
                }
            })
        })
        .catch(err => res.status(500).json({error: err}))
    },
    userDeleteById: (req, res, next) => {
        User.remove({_id: req.params.userId})
        .then(result => {
            res.status(200).json({
                meesage: "User Deleted"
            })
        })
        .catch(err => res.status(500).json({error: err}))
    }

}