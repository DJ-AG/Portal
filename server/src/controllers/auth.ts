import User from "../models/user";

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public

const register = async (req, res, next) => {
  try {
    const { name, email, roleLevel, password } = req.body;

    if(!name) return res.status(400).json({success: false, message: "Please provide a name"});
    if(!email) return res.status(400).json({success: false, message: "Please provide an email"});
    if(!password) return res.status(400).json({success: false, message: "Please provide a password"});
    // Create user
    const user = await User.create({name, email, roleLevel, password});

    res.status(200).json({success: true,});

  } catch (error) {

    res.status(400).json({success: false,});

  }
};


export {register};