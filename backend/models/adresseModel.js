import mongoose from 'mongoose';
import email from 'mongoose-type-email'



const adressSchema = new mongoose.Schema(
    {
        alias: { type: String, required: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        zip_code: { type: Number, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        phone_number: { type: Number, required: true },
        adress: { type: String, required: true },
        adress_more: { type: String, },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
        more_info: { type: String, },
    
    },
    {
        timestamps: true,
    }
);
const Adresse = mongoose.model('Adresse', adressSchema);

export default Adresse;