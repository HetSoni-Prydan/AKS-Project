const { CorrectResponse, ErrorOccur } = require('../Helper/respose');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { User } = require('../Models/Register.Model');
const { RegisterUser } = require('../Helper/validation');


const image_url = process.env.IMAGE_URL
const secretKey = process.env.SECREAT_KEY;

const Register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User Already Registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // Construct the image URL
        const img = image_url + "src/IMG/profile/" + req.file.filename;

        const ValidUser = await RegisterUser.validateAsync(req.body);

        const NewUser = new User({
            firstName: ValidUser.firstName,
            lastName: ValidUser.lastName,
            email: ValidUser.email,
            mobile: ValidUser.mobile,
            password: hashPassword,
            profile: img,
        });

        
        
        const createUser = await NewUser.save();
        
        let token = await jwt.sign({memberData: ValidUser} , secretKey, {expiresIn: "2hr"});
        
        
        CorrectResponse(res, 200, {createUser,token}, "User Successfully Registered");
    } catch (error) {
        // Handle errors appropriately, e.g., using your ErrorOccur function
        console.log(error);
        next(error);
    }
}

const Login = async (req, res, next) => {
    try {
        
        const { email } = req.body;
        const { password } = req.body;
        const user = await User.findOne({ email });
     
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(400).json({ message: "Password Not Match" });
        }

        const token = jwt.sign({ memberData: user }, secretKey, { expiresIn: "1hr" });

        const decodeToken = jwt.decode(token);
        // console.log(decodeToken);
        res.json({
            tokenData: token,
            decodeTokenData: decodeToken
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updateUser = async (req,res,next) => {
    try {
        
        const UserId = req.params.id;
        const UserData = req.body;

        // console.log(req.file.filename);


        if(req.file) {
            UserData.profile = image_url + "src/IMG/profile/" + req.file.filename;
        }

        const Updateuser = await User.findByIdAndUpdate(UserId , UserData , {new: true});

        if(!Updateuser){
            res.status(404).json({
                message: "User Not Update",
            });
        }

        CorrectResponse(res, 200, Updateuser, "User Update Successfuly");


    } catch (error) {
        ErrorOccur(res, "Not Update");
        next();
    }
}


module.exports = { Register, Login,updateUser };