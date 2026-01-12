import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';

dotenv.config();

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/propify');
        console.log('Connected to DB');
        const count = await User.countDocuments({ role: 'seller' });
        console.log('Sellers found:', count);
        const sellers = await User.find({ role: 'seller' }).select('fullName email role');
        console.log('Sellers:', JSON.stringify(sellers, null, 2));
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

test();
