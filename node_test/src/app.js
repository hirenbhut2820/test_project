const express = require('express');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const path = require('path')
const indexRoute = require('./routes/indexRoutes.js')
const session = require('express-session');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'./views'))

app.use('/assets',express.static(path.join(__dirname,'./assets')))

app.use(session({
    secret: 'abcdefg',
    saveUninitialized: true,
    resave: false,
    cookie: { secure: true,maxAge:1000*60*60*24 }
}))

app.use('/',indexRoute)


app.listen(PORT,()=>console.log(`express running at ${PORT}`))