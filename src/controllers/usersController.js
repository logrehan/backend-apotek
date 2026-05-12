import { prisma } from "../lib/prisma.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";

// GET users (tanpa password)
export const getUsers = asyncHandler(async (req, res) => {
  const data = await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      jabatan: true,
    },
  });

  return successResponse(res, data, "Data users");
});

// CREATE users
export const createUsers = asyncHandler(async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return next(new AppError("Input tidak lengkap", 400));
  }

  const { name, email, password, jabatan } = req.body;

  if (!email.includes("@")) {
    return next(new AppError("Email tidak valid", 400));
  }

  if (password.length < 6) {
    return next(new AppError("Password minimal 6 karakter", 400));
  }

  const existing = await prisma.users.findUnique({
    where: { email },
  });

  if (existing) {
    return next(new AppError("Email sudah digunakan", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      jabatan,
    },
  });

  return successResponse(res, data, "User berhasil dibuat", 201);
});