const express = require("express")
const app = express();
const jwt = require("jsonwebtoken")
const path = require("path")
const cookieParser = require('cookie-parser'); // Correct import
const userModel = require("./model/user")
const bcrypt = require('bcrypt')
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser()); // Use cookie-parser middleware


app.get("/",(req,res)=>{ 
    res.render("index")
})

app.get("/register",(req, res)=>{
    res.render("register")
})


app.post("/register",async(req,res)=>{
    let {name,email,password,age,username} = req.body;
     let user =  await userModel.findOne({email});
     if(user) return res.status(500).send("user already registerd") //add flash messege and redirect to registeration page
     
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            //here create
           let user = await userModel.create({
               username,
                name,
                email,
                password:hash,
                age
            })
           let token =  jwt.sign({email:email, userid:user._id},"shhhh")
           //setting cookie
           res.cookie("token",token)
           res.send("registered") //add flash message ANd redirect to login page
        })

    })
    
     
})

app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login", async(req,res)=>{
    let {email,password}=req.body;
    let user = await userModel.findOne({email})
    if(!user) return res.status(500).send("user not found")
    //     bcrypt.compare(password,user.password,(err,result)=>{
    // if(result){
    //         let token =  jwt.sign({email:email, userid:user._id},"shhhh")
    //         //setting cookie
    //         res.cookie("token",token)
    //         res.send("loggedin")
    // }else{
    //     res.redirect("/")
    // }
  
    //     })

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
         
            let token =  jwt.sign({email:email, userid:user._id},"shhhh")
          res.cookie("token", token);
          res.send("login succesfull");
        } else {
          res.send("something is wrong");
        }
      });
})

app.get("/profile",isLoggedIn, (req,res)=>{
    res.render("profile")


})

app.get("/logout",(req, res) => {
    res.cookie("token","");
    res.render("login")

})

    function isLoggedIn(req, res, next){
        if(req.cookies.token=="") res.send("you must login first")
            else{
        let data = jwt.verify(req.cookies.token,"shhhh")
        req.user = data
    }
    next();
    }


app.listen(3000);