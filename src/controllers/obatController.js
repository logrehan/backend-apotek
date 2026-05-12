import { prisma } from "../lib/prisma.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/appError.js";

export const getObat = asyncHandler(async (req, res) => {
  const data = await prisma.obat.findMany({
    include: { jenis_obat: true },
  });

  return successResponse(res, data, "Data obat berhasil diambil");
});

export const getObatById = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return next(new AppError("ID tidak valid", 400));
  }

  const data = await prisma.obat.findUnique({
    where: { id },
    include: { jenis_obat: true },
  });

  if (!data) {
    return next(new AppError("Obat tidak ditemukan", 404));
  }

  return successResponse(res, data, "Detail obat");
});

export const createObat = asyncHandler(async (req, res, next) => {
  if (
    !req.body.nama_obat ||
    !req.body.harga_jual ||
    !req.body.stok ||
    !req.body.id_jenis
  ) {
    return next(new AppError("Input tidak lengkap", 400));
  }

  const nama_obat = req.body.nama_obat;
  const harga_jual = Number(req.body.harga_jual);
  const stok = Number(req.body.stok);
  const id_jenis = Number(req.body.id_jenis);
  const deskripsi_obat = req.body.deskripsi_obat;

  if (
    Number.isNaN(harga_jual) ||
    Number.isNaN(stok) ||
    Number.isNaN(id_jenis)
  ) {
    return next(new AppError("Input harus angka", 400));
  }

  if (stok < 0 || harga_jual <= 0) {
    return next(new AppError("Harga atau stok tidak valid", 400));
  }

  const data = await prisma.obat.create({
    data: {
      nama_obat,
      harga_jual,
      stok,
      id_jenis,
      deskripsi_obat,
    },
  });

  return successResponse(res, data, "Obat berhasil ditambahkan", 201);
});

export const updateObat = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return next(new AppError("ID tidak valid", 400));
  }

  const existing = await prisma.obat.findUnique({
    where: { id },
  });

  if (!existing) {
    return next(new AppError("Obat tidak ditemukan", 404));
  }

  if (
    !req.body.nama_obat ||
    !req.body.harga_jual ||
    !req.body.stok ||
    !req.body.id_jenis
  ) {
    return next(new AppError("Input tidak lengkap", 400));
  }

  const nama_obat = req.body.nama_obat;
  const harga_jual = Number(req.body.harga_jual);
  const stok = Number(req.body.stok);
  const id_jenis = Number(req.body.id_jenis);
  const deskripsi_obat = req.body.deskripsi_obat;

  if (
    Number.isNaN(harga_jual) ||
    Number.isNaN(stok) ||
    Number.isNaN(id_jenis)
  ) {
    return next(new AppError("Input harus angka", 400));
  }

  if (stok < 0 || harga_jual <= 0) {
    return next(new AppError("Harga atau stok tidak valid", 400));
  }

  const data = await prisma.obat.update({
    where: { id },
    data: {
      nama_obat,
      harga_jual,
      stok,
      id_jenis,
      deskripsi_obat,
    },
  });

  return successResponse(res, data, "Obat berhasil diperbarui");
});

export const deleteObat = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return next(new AppError("ID tidak valid", 400));
  }

  const existing = await prisma.obat.findUnique({
    where: { id },
  });

  if (!existing) {
    return next(new AppError("Obat tidak ditemukan", 404));
  }

  await prisma.obat.delete({
    where: { id },
  });

  return successResponse(res, null, "Obat berhasil dihapus");
});
