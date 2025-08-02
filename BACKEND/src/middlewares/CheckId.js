import mongoose from "mongoose";

function checkId(req,res,next){
    let id=req.params.id;
    if(mongoose.Types.ObjectId.isValid(id)){
        next();
    }else{
        res.status(400).json({message:"id is required"});
        return;
    }

}

export default checkId;