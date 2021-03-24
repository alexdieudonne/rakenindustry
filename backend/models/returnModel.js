import mongoose from 'mongoose';
import email from 'mongoose-type-email'

const articleSchema = new mongoose.Schema(
    [
        {
            name: { type: String, required: true },
        },
    ],
)

const returnSchema = new mongoose.Schema(
    {
        reason_more: { type: String },
        reason: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        status:{type: String, default:'En traitement...'},
        article: [articleSchema]
    },
    {
        timestamps: true,
    }
);
const Returns = mongoose.model('Return', returnSchema);

export default Returns;