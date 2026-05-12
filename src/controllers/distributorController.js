import { prisma } from "../lib/prisma.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/appError.js";

// GET distributor
export const getDistributor = asyncHandler(async (req, res) => {
  const data = await prisma.distributor.findMany();

  return successResponse(res, data, "Data distributor berhasil diambil");
});

// POST distributor
export const createDistributor = asyncHandler(async (req, res, next) => {
  const { nama_distributor, telepon, alamat } = req.body;

  if (!nama_distributor || !telepon || !alamat) {
    return next(new AppError("Input tidak lengkap", 400));
  }

  const data = await prisma.distributor.create({
    data: {
      nama_distributor,
      telepon,
      alamat,
    },
  });
  return successResponse(res, data, "Distributor berhasil ditambahkan", 201);
});
