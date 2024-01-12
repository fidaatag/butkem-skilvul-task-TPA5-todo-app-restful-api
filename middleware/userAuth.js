const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.MY_JWT;

const userAuth = (req, res, next) => {
    const token = req.header('token') || req.cookies.token

    try {
        if (!token) {
            return res.status(401).json({ message: "Tidak dapat mengakses, belum login" });
        };

        const decodedToken = jwt.verify(token, secretKey);

        req.user = {
            user_id: decodedToken.id
        };

    } catch(err) {
        return res.json({ message: "Gagal melakukan otentikasi", err });
    };

    next();
}

module.exports = userAuth