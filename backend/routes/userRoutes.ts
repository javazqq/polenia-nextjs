import { Router } from 'express';
import {
    registerUser,
    createGuestUser,
    loginUser,
    logoutUser,
    getUserProfile,
    getUsers
} from '../controllers/userController';
import { protect, admin } from '../middleware/authMiddleware';

const router = Router();

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/users/guest
// @desc    Create a guest user
router.post('/guest', createGuestUser);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
router.post('/login', loginUser);

// @route   POST /api/users/logout
// @desc    Logout user (clear JWT cookie)
router.post('/logout', logoutUser);

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/', protect, admin, getUsers);

export default router;
