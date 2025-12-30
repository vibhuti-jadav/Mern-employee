
import httpError from "../middleware/errorHandling.js";
import employ from "../model/employeModel.js";

const addEmploy= async(req,res,next)=>{
    try {
        
        const {name,password,role,position}=req.body;

        const newData = {
            name,
            password,
            role,
            position,
        }

        const saveData = employ(newData)

        await saveData.save()

        if(!saveData){
            return next(new httpError("employee cant added",400))
        }

        res.status(201).json({message:"employe information added successfully",saveData})

    } catch (error) {
        next(new httpError(error.message))
    }
}

const allEmployee = async(req,res,next)=>{
    try {
        
        const allEmployee =await employ.find({})

        if(!allEmployee){
            return next(new httpError("employe can't find",400))
        }

        res.status(200).json({message:"employe infomation here",allEmployee})

    } catch (error) {
        next(new httpError(error.message))
    }
}

const specificEmploy = async(req,res,next)=>{
    try {
        
        const id = req.params.id;

        const existingEmploy = await employ.findById(id)

        if(!existingEmploy){
            return next(new httpError("user id not find",400))
        }

        res.status(200).json({message:"user find succcessfully",existingEmploy})

    } catch (error) {
        next(new httpError(error.message))
    }
}

const updateEmployee = async(req,res,next)=>{

    try {
        const id = req.params.id;

        const existingEmploy = await employ.findById(id)

        if(!existingEmploy){
            return next(new httpError("employe not found",400))
        }

        const updates = Object.keys(req.body)

        const allowfield = ["name" , "password" , "role" , "position"]

        const isValidUpdate = updates.every((field)=>allowfield.includes(field))

        if(!isValidUpdate){
            return next(new httpError("only allowed field can be updated",400))
        }

        updates.forEach((update)=>{
            existingEmploy[update]=req.body[update]
        })

        await existingEmploy.save()

        res.status(200).json({message:"emloyee information updated successfully",existingEmploy})

    } catch (error) {
        next(new httpError(error.message))
    }
}

const deleteEmploye = async(req,res,next)=>{
    try {
        
        const id = req.params.id;

        const existingEmploy =await employ.findByIdAndDelete(id)

        if(!existingEmploy){
            return next(new httpError("user id not valid",400))
        }

        res.status(200).json({message:"employee deleted succesfully"})

    } catch (error) {
        next(new httpError(error.message))
    }
}

const login = async(req,res,next)=>{

    try {
            const {name , password} = req.body;

            const employee = await employ.findByCredential(name , password)

            if(!employee){
                return next(new httpError("cant loign",400))
            }

            res.status(200).json({message:"employee login successfully",employee})


    } catch (error) {

        next(new httpError(error.message))
        
    }

}


export default {addEmploy , allEmployee , specificEmploy , updateEmployee ,deleteEmploye , login}







