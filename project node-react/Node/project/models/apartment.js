import mongoose from "mongoose";
const apartmentSchema = new mongoose.Schema({

    nameApartment:{type:String,required:false},
    address: { type: String, required: true },
    city: { type:mongoose.Types.ObjectId,ref:'City', required:true},
    price: { type: Number, required: true },
    description:{ type:String, required:true},
    category: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
    image: { type: [String], required: false },
    numBeds: { type: Number, required: true },
    additives:{ type:String, required:false},
    advertiser:{type:mongoose.Types.ObjectId,ref:'Advertiser',required:false}
    // isAvailable: { type: Boolean, required: true }
})
export default mongoose.model('Apartment', apartmentSchema)
