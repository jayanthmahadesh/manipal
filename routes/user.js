const express=require('express')
const passport =require('passport')
const User=require('../models/user')
const router=express.Router()

router.get("/login",function(req,res){
    res.render("login");
});

router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",async(req,res)=>{
    req.session.username=req.body.username;
    
    try{
        const{username,password,email,contact,uniqueID,address,cityName,latitude,longitude}=req.body;
        // console.log(username,password);
        console.log("here1",req.body);
        const user=await new User({username,email,contact,uniqueID,address,cityName,latitude,longitude});
        const UserAuth=await User.register(user,password)
      //  console.log(UserAuth);
        console.log("here2",req.body);
        req.login(UserAuth,err=>{
            if(err) return next(err);
            req.flash('success',`Hello, ${username} Nice to See You`)
            if(req.body.hasOwnProperty("donor")){
                req.session.username=req.body.username;
                //console.log(req.body);
                res.render("dashboard",{name:req.body.username});
            }
            else{
                req.logout(function(err){
                    if(err){
                        return next(err);
                    }
                    else{
                        req.session.username=req.body.username;
                        res.redirect("/login");
                    }
                })
            }
        })

    }catch(err){
        req.flash('error','oops ! User already exists')
        res.redirect('/register')
    }
});

router.post("/login",passport.authenticate('local',{failureFlash: true,failureRedirect:'/register'}),(req,res)=>{
    req.flash("success","welcome back!")
    req.session.username=req.body.username;
    if(req.body.hasOwnProperty("donor")){
        res.render("home",{name:req.body.username,nameOfPerson:"donor",flag:'1'});
    }
    else{
        res.render("home",{name:req.body.username,nameOfPerson:"receiver",flag:'1'});
    }
})

router.get("/logout",function(req,res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        else{
            res.redirect("/home");
        }
    })
})

module.exports=router;