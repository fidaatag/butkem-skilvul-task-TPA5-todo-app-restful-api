const user = require('../models/user');
const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.MY_JWT;

// login
const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userInDB = await user.findOne({ email });
        if (!userInDB) {
            throw new Error ("not found email");
        };

        const comparePassword = await brcypt.compare(password, userInDB.password);
        if (!comparePassword) {
            throw new Error ("wrong password");
        };

        const token = await jwt.sign({ id: userInDB._id }, secretKey);

        // Menghilangkan password sebelum mengirimkan userInDB sebagai respons
        userInDB.password = undefined;
        
        res.status(201).cookie('token', token, {
            expires: new Date(Date.now() + 3 * 4 * 100000),
            httpOnly: false
        }).json({
            succes: true,
            token,
            user: userInDB
        });
        
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        });
    };
};

// register
const userRegisterController = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const userInDB = await user.findOne({ email });
        if (userInDB) {
            throw new Error ('Email sudah terdaftar, gunakan email lainnya');
        };

        const salt = await brcypt.genSalt(10)
        const encryptedPassword = await brcypt.hash(password, salt)

        const newUser = await user.create({
            name,
            email,
            password: encryptedPassword,
        });

        const token = await jwt.sign({ id: newUser._id }, secretKey);

        const createdUser = newUser;
        createdUser.password = undefined;

        res.status(201).cookie('token', token, {
            expires: new Date(Date.now() + 3 * 4 * 100000),
            httpOnly: false
        }).json({
            succes: true,
            token,
            user: createdUser
        })

    } catch(err) {
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}



module.exports = {
    userLoginController,
    userRegisterController,
}