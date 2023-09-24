const { User } = require("../models/UserModel");
const UserRole = require('../enums/UserRole');

const Admin = (req, res, next) => {
    let token = req.header('x-access-token') || req.header('authorization');

    if (token) {
        if (token.startsWith('Bearer')) {
            token = token.slice(7, token.length);
        }

        User.findByToken(token, (err, user) => {
            if (err) throw err;

            console.log(user);
            try {
                if (user.userType !== UserRole.ADMIN) {
                    res.status(403).json({
                        success: false,
                        message: "No authorization to access this route!"
                    });
                }
            } catch (e) {
                console.log(e);
            }


            next();
        });
    }
};

module.exports = { Admin };