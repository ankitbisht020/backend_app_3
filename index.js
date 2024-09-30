require('dotenv').config();
const PORT =process.env.PORT || 4005;

const cookieParser = require('cookie-parser');
const express =require("express");
const path =require('path');
const bcrypt =require('bcrypt');
const user =require('./models/mongoose');
const posts =require('./models/post');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
let jwt = require('jsonwebtoken');
const { reset } = require('nodemon');
const { config } = require('process');


app.set('view engine', 'ejs');
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser())
app.use(session({
    secret: 'heighlysecure', // replace with a secure key
    resave: false,
    saveUninitialized: true,
})); 


app.use((req,res,next)=>{
    console.log("Server updates");
    next();
})
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.get('/',(req,res)=>{
    res.render('app');
})

app.post('/addpost',isvalid,async (req,res)=>{
    let {title,caption,imageurl}=req.body;
    try{
    await posts.create({
        title,
        caption,
        imageurl,
        userid:req.user.userid
    })
    res.redirect('/post');
    }catch(err){
        res.send("error ayya");
    }

})

app.get('/delete/:time', async (req,res)=>{
    await posts.findOneAndDelete({createat:req.params.time});
    res.redirect('/post');
})

app.get('/post',isvalid, async(req,res, next)=>{
    let {email,userid}=req.user;
    try{
        let post=  await posts.find({userid});
        res.render('posts',{post, email});
        next();
    }catch(err){
        res.send("you must be loged in.")
    }

    })

app.post('/login', async(req,res)=>{

    let {email,password}=req.body;
        try{
            const founduser= await user.findOne({email:email});
            if (founduser) {
                bcrypt.compare(password,founduser.password, function(err, result) {
                    if(result){
                        
                        let token =jwt.sign({email: email, userid:founduser._id},"shhhh");
                        res.cookie('token',token,{ httpOnly: true });
                        req.flash('success_msg', 'Form submitted successfully!');
                        res.redirect('/post');
                    }else{
                        req.flash('error_msg', 'Password not matched');
                        res.redirect('/');
                    }
                });
    
            }else{
                req.flash('error_msg', 'User not find');
                res.redirect('/');
            }
            
        }catch(error){
            res.flash('error_msg',"Somthing went wrong at our side.")
            res.redirect('/');
        };
        });



app.get('/logout',(req,res)=>{
    res.cookie('token','');
    res.redirect('/');
})
app.post('/create',(req,res)=>{

    let {name,email,password}=req.body;
    bcrypt.hash(password, 10,  async (err, hash)=> {
        try{
            await user.create({
            name,
            email,
            password:hash
            });
            let token =jwt.sign({email: email, userid:user._id},"shhhh");
            res.cookie("token",token);
            req.flash('success_msg', 'Form submitted successfully!');
            res.redirect('/post');
        }catch(error){
            req.flash('error_msg', 'Email already registerd.');
            res.redirect('/');
        };
        });

})



function isvalid(req,res,next){
    if(req.cookies.token ==="") res.send("You must be logged in");
    else{
    let data= jwt.verify(req.cookies.token,"shhhh");
    req.user =data;
    }
    next();
}
app.listen(PORT,(req,res)=>{
    
});