import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    nameCategory:{type:String, required:true,enum:["צימר","יחידת אירוח","דירה להשכרה","מלונית","וילות"]},
    arrApartment: { type: [mongoose.Types.ObjectId],ref: 'Apartment', required: true}

})

export default mongoose.model('Category', categorySchema)