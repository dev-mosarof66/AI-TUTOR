import mongoose from 'mongoose'


const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
}, {
    timestamps: true
});


const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    duration: { type: Number, default: null },
    video: { type: String, default: null, required: true },
    links: { type: String, default: null },
    comments: [{ commentSchema }]
});

const Module = mongoose.models.Module || mongoose.model('Module', moduleSchema);

export default Module;