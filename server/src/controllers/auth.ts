import User from "../models/user";
import asyncErrorHandler from '../middleware/asyncErrorHandler'
import ErrorResponse from "../utils/errorResponse";
import * as config from "../utils/config";

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public

const register = asyncErrorHandler(async (req, res, next) => {
    const { name, email, roleLevel, password } = req.body;

    if(!name) return next(new ErrorResponse("Please provide a name", 400));

    if(!email) return next(new ErrorResponse("Please provide an email", 400));

    if(!password) return next(new ErrorResponse("Please provide a password", 400));

    // Create user
    const user = await User.create({name, email, roleLevel, password});

    res.status(200).json({success: true, user});
});


// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public

const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) return next(new ErrorResponse("Please provide an email and password", 400));

  const user = await User.findOne({email}).select("+password");

  if(!user) return next(new ErrorResponse( "Invalid credentials", 401));

  const isMatch = await user.matchPassword(password);

  if(!isMatch) return next(new ErrorResponse("Invalid credentials",401));

  sendTokenResponse(user, 200, res);

})


const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  // Define the type for the options object
  interface CookieOptions {
    expires: Date;
    httpOnly: boolean;
    secure?: boolean; // The secure property is optional
  }

  const options: CookieOptions = {
    expires: new Date(Date.now() + config.jwt_cookie_expire * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (config.node_env === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({success: true, token});
}




export {register, loginUser};