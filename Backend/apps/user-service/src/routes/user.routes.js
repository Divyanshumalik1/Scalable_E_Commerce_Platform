import express from 'express';
import { Router } from 'express';
import { userSignupController, userLoginController, userFetchDetailsController, userUpdateDetailsController, userDeleteAccountController } from '../controllers/user.controllers.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const userRouter = Router();

// login ,signup, fetch user details, update user details, delete user account

// Unprotected routes
// POST /api/users/signup
userRouter.post('/signup', userSignupController);
// POST /api/users/login
userRouter.post('/login', userLoginController);

// Protected routes
// GET /api/users/user/:id
userRouter.get('/user/:id', authMiddleware, userFetchDetailsController);
// PUT /api/users/user/:id
userRouter.put('/user/:id', authMiddleware, userUpdateDetailsController);
// DELETE /api/users/user/:id
userRouter.delete('/user/:id', authMiddleware, userDeleteAccountController);

export default userRouter;