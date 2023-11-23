import express from "express";
import { createUser, getUser, getUsers, updateUser, deleteUser } from '../controllers/user'

import { authorize, protect } from '../utils/middleware';

const router = express.Router();

router.use(protect)
router.use(authorize('admin'));

router
    .route('/')
    .get(getUsers)
    .post(createUser);


router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);


export default router;