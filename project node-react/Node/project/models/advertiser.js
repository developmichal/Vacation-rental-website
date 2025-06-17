import mongoose from "mongoose";

const advertiserSchema = new mongoose.Schema({

    email: { type: String, required: true, unique: true ,match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/},
    phone1: { type: String, required: true },
    phone2: { type: String, required: false },
    password: { type: String, required: true },
    arrApartment: { type: [mongoose.Types.ObjectId], required: true}
})

export default mongoose.model('Advertiser', advertiserSchema)
