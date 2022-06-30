const express = require('express');
const router = express.Router()
const { userModel } = require('../db/db.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const authCheck = (req,res,next)=>{
    if(req.session.username){
        res.redirect('/')
    }else{
        next()
    }
}

const authValidate = (req,res,next)=>{
    if(req.session.username){
        next()
    }else{
        next()
        res.redirect('/login')
    }
}

router.get('/',authValidate, (req, res) => {
    res.render('index')
})

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login')
})

router.get('/login', authCheck, (req, res) => {
    res.render('login')
})

router.get('/signup', authCheck, (req, res) => {
    res.render('signup')
})

router.post('/signupAPI', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10)
    let userState = await userModel.findOne({ email: req.body.email })
    if (!userState) {
        let userData = new userModel(req.body)
        await userData.save();
        res.send({ status: 'user_inserted' })
    } else {
        res.send({ status: 'user_found' })
    }
})

router.post('/loginAPI', async (req, res) => {
    let userpass = await userModel.findOne({ email: req.body.email })
    if (userpass) {
        let password = await bcrypt.compare(req.body.password, userpass.password)
        if (password) {
            let auth_token = jwt.sign({ email: req.body.email }, process.env.JWT_KEY)
            req.session.username = 'auth_token'
            res.send({ status: 'user_valid', auth_token: auth_token })
        } else {
            res.send({ status: 'user_invalid' })
        }
    } else {
        res.send({ status: 'user_invalid' })
    }
})

module.exports = router