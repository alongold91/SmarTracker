import mongoose from 'mongoose';
import { UserModel } from '../models/users';
import { ExpenseModel } from '../models/expenses';
import { config } from '../config/config';

export async function initDB(): Promise<void> {
    try {
        const mongoUrl = config.mongo.url;
        
        if (!mongoUrl) {
            throw new Error('MONGO_URL environment variable is not defined');
        }

        await mongoose.connect(mongoUrl);
        console.log('Connected to MongoDB');

        // Create collections if they don't exist
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map(col => col.name);

        if (!collectionNames.includes('users')) {
            await mongoose.connection.db.createCollection('users');
            await UserModel.createIndexes();
            console.log('Users collection and indexes created');
        }

        if (!collectionNames.includes('expenses')) {
            await mongoose.connection.db.createCollection('expenses');
            await ExpenseModel.createIndexes();
            console.log('Expenses collection and indexes created');
        }
        
        console.log('Database schemas initialized successfully');
    } catch (error) {
        console.error('Failed to initialize database:', error);
        throw error;
    }

    mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected');
    });
}
