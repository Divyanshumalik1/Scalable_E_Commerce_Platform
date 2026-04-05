import express from 'express';
import { Router } from 'express';
import { userSignupController, userLoginController, userFetchDetailsController, userUpdateDetailsController, userDeleteAccountController } from '../controllers/user.controllers.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// login ,signup, fetch user details, update user details, delete user account

// Unprotected routes
// POST /api/users/signup
router.post('/signup', userSignupController);
// POST /api/users/login
router.post('/login', userLoginController);

// Protected routes
// GET /api/users/user/:id
router.get('/user/:id', authMiddleware, userFetchDetailsController);
// PUT /api/users/user/:id
router.put('/user/:id', authMiddleware, userUpdateDetailsController);
// DELETE /api/users/user/:id
router.delete('/user/:id', authMiddleware, userDeleteAccountController);
