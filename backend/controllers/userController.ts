import { Request, Response, RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db";

// Generate JWT
const generateToken = (id: number, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, "client"]
    );

    const user = newUser.rows[0];

    const token = generateToken(user.id, user.role);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
      // optional: include token if your frontend expects it
      // token: token,
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Create guest user or return existing one if token present
// @route POST /api/users/guest
// @access Public
export const createGuestUser: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number, role: string };

        const userQuery = await pool.query(
          "SELECT id, name, email, role FROM users WHERE id = $1",
          [decoded.id]
        );

        if (userQuery.rows.length > 0) {
          res.status(200).json({
            token,
            user: userQuery.rows[0],
          });
          return; // Keep this return to exit the function
        }
      } catch {
        // token invalid or expired, create new guest
      }
    }

    // No valid token - create new guest user
    const uuid = uuidv4();
    const email = `guest_${uuid}@guest.local`;
    const password = uuid; // internal use only
    const name = "Guest";
    const role = "guest";

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, is_guest)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, role`,
      [name, email, password, role, true]
    );

    const user = result.rows[0];

    const newToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      token: newToken,
      user: result.rows[0] 
    });
  } catch (error) {
    console.error("Guest user creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", { email, password });

  try {
    const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userQuery.rows.length === 0) {
      console.log("User not found:", email);
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const user = userQuery.rows[0];
    console.log("User found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Set JWT cookie
    const token = generateToken(user.id, user.role);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Logout user (clear JWT cookie)
// @route   POST /api/users/logout
// @access  Public
export const logoutUser: RequestHandler = (_req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;
  res.json(user);
};

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT id, name, email, role FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
