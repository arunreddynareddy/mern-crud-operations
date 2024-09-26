import User from "../model/userModel.js";

export const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const {email} = newUser;
        const userExist = await User.findOne({email});
        if (userExist) {
            return res.status(400).json({message: "User already exists."})
        }
        await newUser.save();
        res.status(200).json({message: "User created successfully"})
        
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        if (!allUsers || allUsers.length === 0) {
            return res.status(400).json({message: "Users data not found"})
        }
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User data not found"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})  
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(400).json({message: "User not found"})
        }
        await User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).json({message: "User updated successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(400).json({message: "User not found"})
        }
        await User.findByIdAndDelete(id)
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}