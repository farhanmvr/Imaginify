import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    Conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {
        Conn: null,
        promise: null,
    };
}

export const connectToDatabase = async () => {
    if (cached.Conn) return cached.Conn;

    if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

    cached.promise =
        cached.promise ||
        mongoose.connect(MONGODB_URL, {
            dbName: 'imaginify',
            bufferCommands: false,
        });

    cached.Conn = await cached.promise;
};
