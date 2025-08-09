import { Schema, model } from 'mongoose';

const planSchema = new Schema({
    title: { type: String, default: null },
    amount: { type: Number, default: 0 },
    transactionId: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' }
}, { timestamps: true });

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    currentPlan: { type: String, default: null },
    plans: [planSchema],

    enrolledCourses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
}, {
    timestamps: true
});

const User = model('User', UserSchema);
export default User;
