import express from 'express';
import dotenv from 'dotenv'
const dotenvCon = dotenv.config();
import connectDb from './config/dbConnection.js';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';

connectDb();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})