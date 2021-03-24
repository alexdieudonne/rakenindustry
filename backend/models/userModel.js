import mongoose from 'mongoose';
import email from 'mongoose-type-email'
import uniqueValidator from 'mongoose-unique-validator'



const userSchema = new mongoose.Schema(
  {
    gender: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: email, required: true, unique: true },
    phone_number: { type: Number, unique: false },
    customerID_stripe: { type: String, unique: true },
    password: { type: String, required: true },
    birthday: { type: Date },
    adresses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Adresse',
      required: true,
    },
    {
      timestamps: true,
    }
    ],
    newsletter: { type: Boolean, default: false, required: true },
    isAdmin: { type: Boolean, default: false, },
  },
  {
    timestamps: true,
  }
);

// userSchema.plugin(uniqueValidator, {
//   message: '{PATH} must be unique.'
// })
const User = mongoose.model('User', userSchema);
export default User;
