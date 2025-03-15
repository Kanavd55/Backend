const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address"+email)
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(this.valueOf.toLowerCase())){
                throw new Error("Gender is not valid")
            }
        }
    },
    isPremium:{
        type:Boolean,
        default:false
    },
    membershipType:{
        type:String
    },
    photoUrl:{
        type:String,
        default:"https://www.google.com/imgres?q=profile%20pic&imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F10%2F05%2F22%2F37%2Fblank-profile-picture-973460_1280.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&docid=wg0CyFWNfK7o5M&tbnid=ycNOFIKv7gjqcM&vet=12ahUKEwjgkteUgoqMAxV_cPUHHadZMhAQM3oECHsQAA..i&w=1280&h=1280&hcb=2&ved=2ahUKEwjgkteUgoqMAxV_cPUHHadZMhAQM3oECHsQAA",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Url")
            }
        }
    },
    about:{
        type:String,
        default:"This is default about the user"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
})

//const User = mongoose.model("User",userSchema);


module.exports = mongoose.model("User",userSchema);