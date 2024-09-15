const express=require('express');
const app=express()
const mongoose=require('mongoose')
require('dotenv').config();
const path=require('path')
var session = require('express-session')
const MongoStore = require('connect-mongo');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','hbs');
const hbs = require('hbs');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://ayushg2602:ZSGqT45T6TeA4exk@cluster0.tzfje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/github_proj' })
}))
const passport=require('./authentication/passport')
app.use(passport.initialize());
app.use(passport.session());
hbs.registerPartials(__dirname + '/views/partials');
const userRouter=require('./routes/user')
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });
app.use('/',userRouter);
const PORT=4000;
mongoose.connect('mongodb+srv://ayushg2602:ZSGqT45T6TeA4exk@cluster0.tzfje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/github_proj')
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})