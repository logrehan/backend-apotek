import { prisma } from "../lib/prisma.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/appError.js";

export const getMetodeBayar = asyncHandler(async (req, res) => {
  const data = await prisma.metode_bayar.findMany();

  return successResponse(res, data, "Data metode pembayaran");
});

export const createMetodeBayar = asyncHandler(async (req, res, next) => {
  const { metode_pembayaran, tempat_bayar, no_rekening, url_logo } = req.body;

  if (!metode_pembayaran || !tempat_bayar || !no_rekening) {
    return next(new AppError("Input tidak lengkap", 400));
  }

  if (Number.isNaN(Number(no_rekening))) {
    return next(new AppError("Nomor rekening tidak valid", 400));
  }

  const data = await prisma.metode_bayar.create({
    data: {
      metode_pembayaran,
      tempat_bayar,
      no_rekening,
      url_logo,
    },
  });

  return successResponse(
    res,
    data,
    "Metode pembayaran berhasil ditambahkan",
    201
  );
});