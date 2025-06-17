import mongoose from "mongoose";

const citySchema = new mongoose.Schema({

    nameCity: {type: String, required:true, unique:true},
    arrApartment: { type: [mongoose.Types.ObjectId], required: false}

})
export default mongoose.model('City', citySchema)
 
