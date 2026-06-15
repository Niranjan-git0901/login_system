    const express = require("express");
    const router = express.Router();
    const bcrypt = require("bcrypt");
    const User = require("../models/user");
    const jwtAuth = require("../middleware/jwtauth");
    const jwt = require("jsonwebtoken");
    router.use(express.json());
    router.post("/signup", async (req, res) => {

        const { name, email, password } = req.body;


        if(!name || !email || !password){
            return res.status(400).send("All Fields Are Required");
        }

        if(!email.includes("@")){
        return res.status(400).send("Invalid Email");
    }

        if(password.length < 6){
        return res.status(400).send(
            "Password must be at least 6 characters"
        );
    }


        let existingUser;

        try{
            existingUser = await User.findOne({
                email: email
            });
        }
            catch(err){
                console.log(err);
                return res.status(500).send("Database Error");
    }

        if(existingUser){
            return res.status(400).send("Email Already Registered");
        }

        let hashedPassword;
        try{
        hashedPassword =
            await bcrypt.hash(password, 10);
        }catch(err){
            return res.status(500).send("Error Hashing Password");
        }


        try{
            const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).send("User Saved Successfully");
        }
        catch(err){
            return res.status(500).send("Error Saving User");
        }
        

    });
    router.post("/login", async (req, res) => {

        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).send("All Fields Are Required");
        }
        let user;
        try{
            user = await User.findOne({
            email: email
        });
        }catch(err){
            console.log(err);
            return res.status(500).send("Database Error");
        }
        if(!user){
            return res.status(404).send("User Not Found");
        }
        let match;

        try{
            match = await bcrypt.compare(
                password,
                user.password
            );
        }
        catch(err){
            return res.status(500).send("Password Check Failed");
        }

        if(match){

        let token;

        try{
            token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );
        }
        catch(err){
            return res.status(500).send("Token Creation Failed");
        }

        res.status(200).json({
            message: "Login Success",
            token: token
        });
    }
        else{
            res.status(401).send("Wrong Password");
        }

    });
    router.get(
        "/dashboard",

        jwtAuth,// Middleware to check if user is authenticated

        (req,res)=>{
            res.status(200).json({
             message: "Welcome Dashboard"
});
        }
    );
    router.get(
        "/profile",

        jwtAuth,
        (req,res)=>{

            res.json({
                message:"Welcome",
                user:req.user
            });

        }
    );
    router.get("/logout", (req, res) => {
        res.send("Logout Success");

    }); 
    module.exports = router;