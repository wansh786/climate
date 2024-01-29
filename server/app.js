require("dotenv").config();
const express=require("express");
const app=express();
const cors=require("cors");
const PORT=6005;

const session=require("express-session")
const passport=require("passport")
const OAuth2Strategy=require("passport-google-oauth2").Strategy;

const clientId="1012755852074-2kobqqfjr34kd4lfjvr9hf18rifagqpi.apps.googleusercontent.com"

const clientSecret="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"
const {UserModel}=require("./models/user.model")

require("./db/connection")
//origin,methods,etc are required for google authentication
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}))

app.use(express.json());

 
// set up session
// use of this is, when clicking on signin with google,
// is to create an session id in encrypted form,
// for validating the user and getting the data of the user
app.use(session({
    secret:"1kdhfkh994unof04p9djojdndf93",
    resave:false,
    saveUninitialized:true
}))
// app.get("/",(req,res)=>{
//     res.status(200).json("loginwithgoogle server starts")
// })

//setup passport
app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new OAuth2Strategy({
        clientID:clientId,
        clientSecret:clientSecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        console.log("profile",profile)
        console.log("accessToken",accessToken)
        // console.log("refreshToken",refreshToken)
        try {
            let user=await UserModel.findOne({googleId:profile.id}) //getting google id from profile id
            

            if(!user){
                user=new UserModel({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                })
                await user.save()

                console.log(user)
                console.log(user.displayName)
            }

            
            
            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    })
)
//if you do not do this serialize and deserialize it will show you an error
passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

//initialize google oauth login

app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}))

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/weather",
    failureRedirect:"http://localhost:3000"
}))

app.get("/login/success",async(req,res)=>{
    // console.log("login is success for loginwithGoogle",req.user)

    if(req.user){
        res.status(200).json({msg:"user-login",user:req.user})
    }else{
        res.status(400).json({msg:"not authorized for request user"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){
            return next(err)
        }
        res.redirect("http://localhost:3000")
    })
})

app.listen(PORT,()=>{
    console.log(`server is runnning at port ${PORT}`)
})