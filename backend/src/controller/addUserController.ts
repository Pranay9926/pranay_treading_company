import { Request, Response } from 'express';
import { CreateUser } from '../service/userService';


export const Add_user = async (req: Request, res: Response) => {
    console.log('***', req.body);
    try {
        // Create a new user
        const userValue = await CreateUser(req);
        console.log("this is your value ", userValue);
        return res.status(201).json({ message: 'User created successfully', userValue });
    } catch (error: any) {
        return res.status(400).json({ message: error.errors[0].message });
    }

}