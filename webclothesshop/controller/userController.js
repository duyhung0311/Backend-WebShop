const mongoose = require("mongoose");
const User = require("../models/user");

const brcypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "123456"
const getToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            fName: user.fName,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
};
const Admin = async (req, res) => {

    const createdAdmin = new User({
        fName: "Admin",
        email: "Admin123@gmail.com",
        password: "Duy1234",
        isAdmin: true,
        isConfirm: true,
        isLock: false,
    });
    let hash;

    hash = await brcypt.hash(createdAdmin.password, 9);

    const createdAdmin1 = new User({
        fName: "Admin",
        email: "Admin123@gmail.com",
        password: hash,
        isAdmin: true,
        isConfirm: true,
        isLock: false,
    });
    let newAdmin;
    newAdmin = await createdAdmin1.save();
    console.log(newAdmin);
    let token = getToken(createdAdmin1);
    console.log(token);


    try {
        res.status(201).json({
            message: "Create admin",
            token,
            newAdmin
        });


    } catch (error) {
        res.status(500).json({
            message: "Fail, try again"
        })
    }
    // res.status(201).json({
    //     newAdmin,
    //     "Token": token
    // })
}
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)
    let accountAdmin;
    accountAdmin = await User.findOne({ email: email });
    let token = getToken(accountAdmin);
    console.log(accountAdmin);
    console.log(token);
    try {
        return  res.status(200).json({
            email: accountAdmin.email,
            isAdmin: accountAdmin.isAdmin,
            token: token,
            message: true
        })
    } catch (error) {
         message:error
    }
}
const register = async (req, res) => {
    const { fName, email, password } = req.body;
    let accountUser = await User.findOne({ email: email });
    console.log(accountUser);
    let hashpw = await brcypt.hash(password, 9);
    const createUser = new User({
        fName: req.body.fName,
        email: req.body.email,
        isAdmin: false,
        isLock: false,
        isConfirm: false,
        password: hashpw
    });
    console.log(createUser);
    let newUser = await createUser.save();
    console.log(newUser);
    let token = getToken(createUser);
    console.log(token);
    try {
        res.status(201).json({
            message: "Create account user successfully",
            token,
            newUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail, try again"
        })
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    let accountUser;
    accountUser = await User.findOne({ email: email });
    console.log(accountUser);
    let ValidPW = await brcypt.compare(password, accountUser.password);
    let token = getToken(accountUser);
    try {
        res.status(200).json({
            message: "Login account user successfully",
            email: accountUser.email,
            isAdmin: accountUser.isAdmin,
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail, try again"
        })
    }

};
const getListUser = async (req, res) => {
    let user;
    try {
        user = await User.find();
        console.log(user);
        return res.json({
            message: true,
            "Item created": user
        });
    } catch (error) {
        res.json({
            message: "Error, try again"
        });
    }
}
const getUserbyId = async (req, res) => {
    const id = req.params.uid;
    let users;
    try {
        users = await User.findById(id);
        console.log(users)
        return res.json({
            message: true,
            "Product by Id": users
        })
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
}

module.exports = { Admin, loginAdmin, register, login, getListUser, getUserbyId }