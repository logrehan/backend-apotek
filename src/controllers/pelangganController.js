import { prisma } from "../lib/prisma.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";

export const getPelanggan = asyncHandler(async (req, res) => {
  const data = await prisma.pelanggan.findMany();

  return successResponse(res, data, "Data pelanggan");
});

export const createPelanggan = asyncHandler(async (req, res, next) => {
  if (
    !req.body.nama_pelanggan ||
    !req.body.email ||
    !req.body.no_telp ||
    !req.body.katasandi
  ) {
    return next(new AppError("Input tidak lengkap", 400));
  }

  const {
    nama_pelanggan,
    email,
    no_telp,
    alamat1,
    kota1,
    propinsi1,
    kodepos1,
    katasandi,
  } = req.body;

  // validasi email sederhana
  if (!email.includes("@")) {
    return next(new AppError("Email tidak valid", 400));
  }

  // cek email sudah ada
  const existing = await prisma.pelanggan.findUnique({
    where: { email },
  });

  if (existing) {
    return next(new AppError("Email sudah digunakan", 400));
  }

  // hash password
  const hashedPassword = await bcrypt.hash(katasandi, 10);

  const data = await prisma.pelanggan.create({
    data: {
      nama_pelanggan,
      email,
      no_telp,
      alamat1,
      kota1,
      propinsi1,
      kodepos1,
      katasandi: hashedPassword,
    },
  });

  return successResponse(res, data, "Pelanggan berhasil dibuat", 201);
});

export const updatePelanggan = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return next(new AppError("ID tidak valid", 400));
  }

  const existing = await prisma.pelanggan.findUnique({
    where: { id },
  });

  if (!existing) {
    return next(new AppError("Pelanggan tidak ditemukan", 404));
  }

  if (!req.body.nama_pelanggan || !req.body.email || !req.body.no_telp) {
    return next(new AppError("Input tidak lengkap", 400));
  }

  const { nama_pelanggan, email, no_telp } = req.body;

  if (!email.includes("@")) {
    return next(new AppError("Email tidak valid", 400));
  }

  const data = await prisma.pelanggan.update({
    where: { id },
    data: {
      nama_pelanggan,
      email,
      no_telp,
    },
  });

  return successResponse(res, data, "Data berhasil diperbarui");
});

export const deletePelanggan = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return next(new AppError("ID tidak valid", 400));
  }

  const existing = await prisma.pelanggan.findUnique({
    where: { id },
  });

  if (!existing) {
    return next(new AppError("Pelanggan tidak ditemukan", 404));
  }

  await prisma.pelanggan.delete({
    where: { id },
  });

  return successResponse(res, null, "Pelanggan berhasil dihapus");
});
