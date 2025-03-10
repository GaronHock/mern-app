// server/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Ensure this model is defined
interface RequestWithTokenDecoded extends Request {
  tokenDecoded?: jwt.JwtPayload; // Adding `tokenDecoded` to the request
}

// Register new user
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to DB
    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' },
    );

    // Send back the token as response
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password, username } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with the hashed password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' },
    );

    console.log(token);

    // Return the token
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get user details
// Get user details
export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body; // The userId is set in the protect middleware
    if (!email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
// Get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Return all users
    return res.status(200).json({
      users: users.map((user) => ({
        username: user.username,
        email: user.email,
      })),
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

//

// Get user by username (using decoded JWT data to get the user from the database)
export const getUserByUsername = async (
  req: RequestWithTokenDecoded,
  res: Response,
): Promise<any> => {
  try {
    const { username } = req.params;

    // Access tokenDecoded from the request
    const decodedToken = req.tokenDecoded; // This is where the decoded token should be

    // You can log decodedToken if needed for debugging
    console.log(decodedToken);

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
