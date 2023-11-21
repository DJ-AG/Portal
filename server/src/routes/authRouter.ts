import express from 'express';

import {register, loginUser} from '../controllers/auth';

const router = express.Router();

router.post('/', loginUser)
router.post('/register', register);



export default router;