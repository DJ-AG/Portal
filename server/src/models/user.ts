import { Document, Schema, Model, model } from "mongoose";import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as config from "../utils/config"


interface UserDocument extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    refreshToken?: string;
    createdAt: Date;

    blacklistedTokens: {
        token: string;
        expiresAt: Date;
        }[];
  
    getSignedJwtToken(): string;
    matchPassword(enteredPassword: string): Promise<boolean>;
    getResetPasswordToken(): string;
    getRefreshToken(): string;
    blacklistToken(token: string, expiresAt: Date): Promise<void>;
    isTokenBlacklisted(token: string): boolean;
  }

export interface IUser extends UserDocument, Document {}

const UserSchema = new Schema<UserDocument>({
    firstname:{
        type: String,
        required: [true, "Please add a name"]
    },
    lastname:{
        type: String,
        required: [true, "Please add a name"]
    },
    email:{
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: [
            // eslint-disable-next-line no-useless-escape
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            "Please add a valid email"
        ]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    password:{
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt:{
        type: Date,
        default: Date.now
    },
    refreshToken: String,
    blacklistedTokens: [{
        token: { type: String, required: true },
        expiresAt: { type: Date, required: true }
    }],
});

// Define a pre-save middleware function for the UserSchema in Mongoose.
// 'pre('save')' means that this function will run before the document is saved.
UserSchema.pre('save', async function(next){
    // Check if the password field has been modified.
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)

    next();
}
)

UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, config.jwt_secret, { expiresIn: config.jwt_expire });
  };

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function(){
    // Generate a random token using the built-in 'crypto' module.
    const resetToken = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    // Set the expiration date for the token to 10 minutes from now.
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

    // Return the unhashed token.
    return resetToken
}

UserSchema.methods.blacklistToken = function(token: string, expiresAt: Date) {
    this.blacklistedTokens.push({ token, expiresAt });
    return this.save();
};

UserSchema.methods.isTokenBlacklisted = function(token: string) {
    return this.blacklistedTokens.some(blacklisted => blacklisted.token === token);
};

const UserModel:Model<IUser> = model<IUser>("User", UserSchema);

export default UserModel;
