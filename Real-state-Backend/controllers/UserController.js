const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Import the User model
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    const { firstName, lastName, email, phone, password, confirmPassword, termsAccepted, role = 'client' } = req.body;

    // Validation: Ensure all fields are filled, passwords match, and terms are accepted
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !termsAccepted) {
        return res.status(400).json({ message: 'Please fill all fields and accept the terms' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Validate role (if specified) to ensure it's either "client", "agent", or "admin"
    const validRoles = ['client', 'agent', 'admin'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        // Check if email is already used
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Check if phone number is already used
        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: 'User with this phone number already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            role // Assign the role (default to "client" if not provided)
        });

        // Save the user in the database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Login user and generate JWT token
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        // Return the token and user information
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
      const userId = req.user._id; // Assuming you've added user ID from the decoded token
      console.log(userId);
      
      const user = await User.findById(userId).select('-password');
      console.log(user);
       // Exclude password field  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("Err");
                
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const updateUserProfile = async (req, res) => {
    try {
      const userId = req.user._id; // Assuming the user ID comes from the JWT token
  
      // Fields to update (excluding role and password)
      const { firstName, lastName, email, phone } = req.body;
  
      // Validate if email or phone number is already used by another user
      if (email) {
        const emailExists = await User.findOne({ email, _id: { $ne: userId } });
        if (emailExists) {
          return res.status(400).json({ message: 'Email is already in use by another user' });
        }
      }
  
      if (phone) {
        const phoneExists = await User.findOne({ phone, _id: { $ne: userId } });
        if (phoneExists) {
          return res.status(400).json({ message: 'Phone number is already in use by another user' });
        }
      }
  
      // Find and update user data
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, email, phone },
        { new: true, runValidators: true, context: 'query' }
      ).select('-password'); // Exclude password from the response
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ success: true, data: updatedUser, message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const viewUserProfile = async (req, res) => {
    try {
        
        const { userId } = req.params; // Extract user ID from route parameters

        // Find the user by ID, excluding the password field
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
  
module.exports = {
    createUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    viewUserProfile
};
