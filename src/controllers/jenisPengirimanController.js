import { prisma } from "../lib/prisma.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/appError.js";

export const getJenisPengiriman = asyncHandler(async (req, res) => {
  const data = await prisma.jenis_pengiriman.findMany();
  return successResponse(res, data, "Data jenis pengiriman");
});

export const createJenisPengiriman = asyncHandler(async (req, res, next) => {
  const { jenis_kirim, nama_ekspedisi, logo_ekspedisi } = req.body;

  if (!jenis_kirim || !nama_ekspedisi) {
    return next(new AppError("Input tidak lengkap", 400));
  }

  const data = await prisma.jenis_pengiriman.create({
    data: {
      jenis_kirim,
      nama_ekspedisi,
      logo_ekspedisi,
    },
  });

  return successResponse(res, data, "Jenis pengiriman berhasil ditambahkan", 201);
});