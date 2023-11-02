const { CorrectResponse, ErrorOccur } = require('../Helper/respose');
const { RegisterUser } = require('../Helper/validation');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { User } = require('../Models/Register.Model');


const image_url = process.env.IMAGE_URL
const secretKey = process.env.SECREAT_KEY;

const Register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("rffrdfvrdcfvd", req.body);
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User Already Registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // Construct the image URL
        const img = image_url + "src/IMG/profile/" + req.file.filename;

        const ValidUser = await RegisterUserSchema.validateAsync(req.body);

        const NewUser = new User({
            firstName: ValidUser.firstName,
            lastName: ValidUser.lastName,
            email: ValidUser.email,
            mobile: ValidUser.mobile,
            password: hashPassword,
            profile: img,
        });

        const createUser = await NewUser.save();

        // Assuming CorrectResponse and ErrorOccur functions are defined
        CorrectResponse(res, 200, createUser, "User Successfully Registered");
    } catch (error) {
        // Handle errors appropriately, e.g., using your ErrorOccur function
        console.log(error);
        next(error);
    }
}

const Login = async (req, res, next) => {
    try {
        // const { email, password } = req.body;
        // console.log(  "effredfeds",req.body);
        // const user = await User.findOne({email});
        // console.log(user);

        const { email } = req.body;
        const { password } = req.body;
        const user = await User.findOne({ email });
        // const UserPass = await User.findOne({ password });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(400).json({ message: "Password Not Match" });
        }

        const token = jwt.sign({ memberData: user }, secretKey, { expiresIn: "1hr" });

        const decodeToken = jwt.decode(token);
        console.log(decodeToken);
        res.json({
            tokenData: token,
            decodeTokenData: decodeToken
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = { Register, Login };