const UserRepo = require('../repository/userRepo');
const userRepo = new UserRepo();

// To check if the user is Public

const isUserPublic = async (req, res, next) => {
    const { userId } = req;
    const {username} = req.params
    const user = await userRepo.getByUsername(username);
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User does not exist by this Username",
            err: "User not Exist",
            data: {},
        });
    }
    //console.log(superUser,user.id);
    // And also checking username and userId (if logged in matches)

    if (userId == user._id) {
        req.ownsUsername = true;
        return next();
    }

    if (!user.isPublic) {
        return res.status(400).json({
            success: false,
            message: "User is not Public",
            err: "Not a Public User",
            data: {},
        });
    }

    req.username = username
    return next()
}

module.exports = isUserPublic;