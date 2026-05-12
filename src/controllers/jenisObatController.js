import { prisma } from "../lib/prisma.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/appError.js";

export const getJenisObat = asyncHandler(async (req, res) => {
  const data = await prisma.jenis_obat.findMany();
  return successResponse(res, data, "Data jenis obat");
});

export const createJenisObat = asyncHandler(async (req, res, next) => {
  const { jenis, deskripsi } = req.body;

  if (!jenis) {
    return next(new AppError("Jenis obat wajib diisi", 400));
  }

  const data = await prisma.jenis_obat.create({
    data: { jenis, deskripsi },
  });

  return successResponse(res, data, "Jenis obat berhasil ditambahkan", 201);
});

export const updateJenisObat = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);
  const { jenis, deskripsi } = req.body;

  if (Number.isNaN(id) || id <= 0) {
    return next(new AppError("ID tidak valid", 400));
  }

  if (!jenis) {
    return next(new AppError("Jenis obat wajib diisi", 400));
  }
  
  const existing = await prisma.jenis_obat.findUnique({
    where: { id },
  });

  if (!existing) {
    return next(new AppError("Data tidak ditemukan", 404));
  }

  const data = await prisma.jenis_obat.update({
    where: { id },
    data: { jenis, deskripsi },
  });

  return successResponse(res, data, "Data berhasil diperbarui");
});

export const deleteJenisObat = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return next(new AppError("ID tidak valid", 400));
  }

  const existing = await prisma.jenis_obat.findUnique({
    where: { id },
  });

  if (!existing) {
    return next(new AppError("Data tidak ditemukan", 404));
  }

  await prisma.jenis_obat.delete({
    where: { id },
  });

  return successResponse(res, null, "Data berhasil dihapus");
});
