import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  [
      {
          userId: {     
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
           },
      },
  ],
)

const promoSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    users: [userSchema],
    endTime:{type:Date, required:false}
  },
  {
    timestamps: true,
  }
);

// userSchema.plugin(uniqueValidator, {
//   message: '{PATH} must be unique.'
// })
const Promo = mongoose.model('Promo', promoSchema);
export default Promo;
