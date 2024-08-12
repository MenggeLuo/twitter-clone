import express from 'express';
import { signup, login, logout, getMe } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { get } from 'mongoose';

const router = express.Router();

router.get("/me", protectRoute, getMe);

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

export default router;