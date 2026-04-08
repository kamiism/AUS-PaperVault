import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minlength: 2,
            maxlength: 50,
            trim: true,
        },
        lastName: {
            type: String,
            minlength: 2,
            maxlength: 50,
            trim: true,
        },
        username: {
            type: String,
            unique: true,
            required: [true, "Username is required"],
            trim: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone number is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified(this.password)) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.Model("User", userSchema);

export default User;
