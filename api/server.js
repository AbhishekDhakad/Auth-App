import express from 'express';
import dotenv from 'dotenv'
const dotenvCon = dotenv.config();
import connectDb from './config/dbConnection.js';

connectDb();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})