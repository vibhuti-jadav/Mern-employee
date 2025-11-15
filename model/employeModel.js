import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const employSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlenght:6,
    },
    role:{
        type:String,
        required:true,
        trim:true,
    },
    position:{
        type:String,
        required:true,
        trim:true
    }


})

employSchema.pre("save",async function (next) {
    try {
            const employ = this;
            if(employ.isModified("password")){
                employ.password = await bcrypt.hash(employ.password,8)
            }
            console.log("hashed passwod")


    } catch (error) {
        throw new Error(error.message

        )
    }
})


employSchema.statics.findByCredential  = async function ( name , password){

    const employee = await this.findOne({name})

    if(!employee ) return null;

    const isMatched = await bcrypt.compare(password , employ.password)

    if(!isMatched){
        throw new Error("unble to login")
    }

    if(employee.password !== password) return null

    return employee

}



const employ = mongoose.model("employ",employSchema)

export default employ