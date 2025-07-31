import mongoose from 'mongoose'

export async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!, {
            dbName: "db",
        });

        console.log("✅ MongoDB connected:", conn.connection.host);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("❌ MongoDB connection failed");

        if (error.code === "ETIMEOUT" && error.hostname?.includes("_mongodb._tcp")) {
            console.error("📡 DNS resolution failed: Check your internet or DNS settings.");
        }

        console.error(error);
    }
}
