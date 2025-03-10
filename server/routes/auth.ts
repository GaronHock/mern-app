import { Router } from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserByUsername,
} from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

// import { protect } from '../middleware/authMiddleware';
const router = Router();

// Register new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

router.get('/users', getAllUsers);

router.get('/user/username/:username', protect, getUserByUsername);

// Get user details (ed route)
//
export default router;
