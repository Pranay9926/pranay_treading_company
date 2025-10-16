import { UsersModel } from "../model/userModel";
import bcrypt from "bcryptjs";

// const bcrypt = require('bcrypt');

export const CreateUser = async (req: any) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt rounds of 10
        const user = await UsersModel.create({ username, email, password: hashedPassword });
        console.log("the valeu i want ", user);
        return user

        // res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error("Error creating user:", error);
        return error;
        // res.status(500).json({ message: 'Failed to create user' });
    }
}