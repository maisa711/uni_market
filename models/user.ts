import { Schema, model, models} from "mongoose";

// scema for the useer 
const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"],
        match: [/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username must be between 5 and 20 characters long and can only contain alphanumeric characters, underscores and dots"],
    },
    image: {
        type: String,
    }
});

const User = models.User || model("User", userSchema);

export default User;