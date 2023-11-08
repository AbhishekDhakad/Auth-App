import express from 'express';
import { verifyToken } from '../util/verifyUser.js';
import { updateUser } from '../controller/userController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "api is working"
    });
})
router.post('/update/:id', verifyToken, updateUser);

export default router;