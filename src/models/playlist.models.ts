import mongoose from 'mongoose'



const playlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    duration: { type: Number, default: null },
    popular: { type: Boolean, default: false },
    views: { type: mongoose.Schema.ObjectId, ref: 'User', default: 0 },
    thumbnail: { type: String, default: null, required: true },
    level: { type: String, default: null },
    modules: [{ type: mongoose.Schema.ObjectId, ref: 'Module' }]
}, {
    timestamps: true
});



const Playlist = mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema);
export default Playlist