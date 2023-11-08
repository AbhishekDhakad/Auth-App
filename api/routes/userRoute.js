import express from 'express';
import { verifyToken } from '../util/verifyUser.js';
import { updateUser, deleteUser } from '../controller/userController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "api is working"
    });
})
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;