import express from 'express';
import * as userService from '../services/user.service.js';

export const userSignupController = async (req, res) => {

    try {
        //const userData = req.body;
        // call service layer to create user, store in db, return a jwt token for authentication
        const { user, token } = await userService.createUser(req.body);
        res.status(201).json({ user: user, token: token });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }

};

export const userLoginController = async (req, res) => {
    try {
        const { user, token } = await userService.loginUser(req.body);
        res.status(200).json({ user: user, token: token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const userFetchDetailsController = async (req, res) => {
    try {
        const userDetails = await userService.fetchUserDetails(req.params.id);
        res.status(200).json({ user: userDetails });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const userUpdateDetailsController = async (req, res) => {
    try {
        const updatedUserDetails = await userService.updateUserDetails(req.params.id, req.body);
        res.status(200).json({ user: updatedUserDetails });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const userDeleteAccountController = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};