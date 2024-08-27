const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

var userDb = require("../model/userSchema");

exports.registerUser = async (req,res)=>{
    try {
        const { name, email, phone, profession, password } = req.body;
        
        const existingUser = await userDb.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userDb({
            name,
            email,
            phone,
            profession,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully, please login." });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.loginUser = async (req,res)=>{
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userDb.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // If login is successful, send a success message
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

// exports.loadUsers = async (req,res)=>{
//     try {
//         const users = await userDb.find({}, '-password'); // Exclude the password field from the response
//         return res.status(200).json(users);
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", error: error.message });
//     }
// }

exports.loadUsers = async (req, res) => {
    try {
        const users = await userDb.find({}, '-password'); // Exclude the password field from the response
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userDb.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        // const user = await userDb.findById(id);
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }
        // await user.remove();
        const user = await userDb.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { userId, name, email, phone, profession, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        const user = await userDb.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.profession = profession || user.profession;

        if (password) {
            // Make sure to hash the password before saving
            user.password = password; 
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.userLogout = async (req,res)=>{

}



