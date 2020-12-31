const mongoose = require("mongoose");
// const HttpError = require("../error-handle/http-error");
const User = require("../models/user");
const HttpError =require("./../error/error");
const brcypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ message: "Invalid Input! Pls check your data"})
        // console.log(errors);
        // const error = new HttpError("Invalid Input! Pls check your data", 400);
        // return next(error);
    }
      let userEmail;
    userEmail = await User.findOne({email: req.body.email});
    if(userEmail) {
        res.status(301).json({message: "Co roi nha"});
    }
    else {
        const createdUser = {
        name: req.body.name,
        email: req.body.email,
        isAdmin: false,
        isConfirm: false,
        isLock: false,
        password: req.body.password,
    };

        let newUsers;
        try {
            newUsers = new User(createdUser);
            await newUsers.save();
        } catch (error) {
            res.status(500).json(
                "Co loi roi nha"
            );
        }

         res.status(200).json(newUsers)
    }

    let hashedPassword;
    try {
        hashedPassword = await brcypt.hash(password, 9);
    } catch (err) {
        // const error = new HttpError(
        //     "Could not create user, please try again.",
        //     500
        // );
        res.status(500).json({ message: "Could not create user, please try again." })

        // return next(error);
    }

   
    let token;
        token = getToken(createdUser);
    
        // const error = new HttpError(
        //     "Signing up failed, please try again later.",
        //     500
        // );
        // return next(error);
        res.status(500).json({ message: "Signing up failed, please try again later." })

    res.status(201).json({
        newUsers,
        token,
    });
    const url = `http://localhost:3000/api/users/confirmation/${token}`;
    transporter.sendMail({
        to: createdUser.email,
        subject: "Confirm Email",
        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    });
};
const login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
        console.log(existingUser);
    } catch (error) {
        res.status(500).json({ message:"Login failed. Pls try again"})
    }
    
    // try {
    //     existingUser = await User.findOne({ email: email });
    //     console.log(existingUser);
    // } catch (err) {
    //     const error = new HttpError("Login failed. Pls try again", 500);
    //     return next(error);
    // }

    if (!existingUser) {
        // const error = new HttpError("Email or Password is invalid", 401);
        // return next(error);
        res.status(401).json({ message: "Email or Password is invalid"})
    }
    if (existingUser.isConfirm === false || existingUser.isLock === true) {
        res.status(401).json({ message: "Your account is not confirm or was locked"})
        // const error = new HttpError(
        //     "Your account is not confirm or was locked",
        //     401
        // );
        // return next(error);
    }

    let isValidPassword;
    try {
        isValidPassword = await brcypt.compare(password, existingUser.password);
    } catch (err) {
        // const error = new HttpError("Something is error. Pls try again", 401);
        // return next(error);
        res.status(401).json("Something is error. Pls try again")
    }

    if (!isValidPassword) {
        // const error = new HttpError("Email or Password is invalid", 401);
        // return next(error);
        res.status(401).json({ message: "Email or Password is invalid"})
    }

    let token;
    try {
        token = getToken(existingUser);
    } catch (err) {
        // const error = new HttpError("Login failed, please try again later.", 500);
        // return next(error);
        res.status(500).json("Login failed, please try again later.")
    }

    res.status(200).json({
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        token: token,
    });
};
const getConfirmation = async (req, res, next) => {
    const token = req.params.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userData = {
        email: decodedToken.email,
    };
    console.log(userData.email);
    const updatedUser = {
        isConfirm: true,
    };
    let users;

    try {
        users = await User.updateOne({ email: userData.email }, updatedUser);
        console.log(users);
    } catch (err) {
        // const error = new HttpError("Your confirmation is out of time", 500);
        // return next(error);
        res.status(500).json({ message:"Your confirmation is out of time"})
    }

    if (!users) {
        // const error = new HttpError("Could not find any users", 404);
        // return next(error);
        res.status(404).json({ message: "Could not find any users" })

    }

    res.status(200).json({message: 'Verify email Success'});
    // return res.redirect("http://localhost:3001/signupsuccess/");
};
const lockUser = async (req, res, next) => {
    let users;
    const Userid = req.params.uid;
    //console.log(Userid);
    const userLock = {
        isLock: true,
    };
    try {
        users = await User.findByIdAndUpdate(Userid, userLock);
        console.log(users);
    } catch (err) {
        // const error = new HttpError("Something went wrong, can not lock", 500);
        // return next(error);
        res.status(500).json({ message: "Something went wrong, can not lock"})
    }
    if (!users) {
        // const error = new HttpError("Could not lock this user", 404);
        // return next(error);
        res.status(404).json({ message: "Could not lock this user" })

    }
    res.status(200).json({
        message: "lock user successful",
        users: userLock,
    });
};
const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not find any user",
            500
        );
        return next(error);
    }
    console.log(users);
    if (!users) {
        const error = new HttpError("Could not find any user", 404);
        return next(error);
    }
    res.status(200).json({ users });
};
const getUserById = async (req, res, next) => {
    let users;
    const UserId = req.params.uid;
    try {
        users = await User.findById(UserId);
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not find any user.",
            500
        );
        return next(error);
    }
    if (!users) {
        const error = new HttpError(
            "Could not find any user for the provided id.",
            404
        );
        return next(error);
    }
    res.json({ users: users.toObject({ getters: true }) });
};

module.exports ={register,login,getConfirmation,lockUser,getAllUsers,getUserById};

