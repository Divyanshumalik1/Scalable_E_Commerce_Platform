import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.models.js';
import { JWT_SECRET } from '../config/index.js';

const createUser = async (userData) => {

    const [username, email, password, passwordConfirm] = [userData.username, userData.email, userData.password, userData.passwordConfirm];

    // validate data
    if (!username || !email || !password || !passwordConfirm) {
        throw new Error('All fields are required');
    }

    if (password !== passwordConfirm) {
        throw new Error('Passwords do not match');
    }

    // check if user already exists
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });


    if (existingUser) {
        throw new Error('User already exists');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user in db
    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });

    await newUser.save();

    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;

    // generate jwt token - Synchronous Sign with default (HMAC SHA256)
    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' }); // expires in 1 hour

    return { user: userWithoutPassword, token: token };

};


const loginUser = async (userData) => {

    const [email, username, password] = [userData.email, userData.username, userData.password];

    // validate data
    if (!email && !username || !password) {
        throw new Error('Email or username and password are required');
    }

    // find user by email or username
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    //hash pass and compare
    const isMatching = await bcrypt.compare(password, user.password);

    if (!isMatching) {
        throw new Error('Invalid credentials');
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // else return jwt token
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' }); // expires in 1 hour

    return { user: userWithoutPassword, token: token };


};

const fetchUserDetails = async (userId) => {
    const user = await User.findById(userId).select('-password'); // exclude password
    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

const updateUserDetails = async (userId, updateData) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    if (updateData.email) user.email = updateData.email;
    if (updateData.username) user.username = updateData.username;

    user.updatedAt = Date.now();

    const updatedUser = await user.save();
    const safeUser = updatedUser.toObject();
    delete safeUser.password;

    return safeUser;
}


const deleteUser = async (userId) => {

    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
        throw new Error('User not found');
    }

    return { message: 'User deleted successfully' };

}

export { createUser, loginUser, fetchUserDetails, updateUserDetails, deleteUser };