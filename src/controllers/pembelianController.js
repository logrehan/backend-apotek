import { prisma } from "../lib/prisma.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/appError.js";

export const getPembelian = asyncHandler(async (req, res) => {
  const data = await prisma.pembelian.findMany({
    include: {
      distributor: true,
    },
  });

  return successResponse(res, data, "Data pembelian");
});

export const createPembelian = asyncHandler(async (req, res, next) => {
  if (
    !req.body.nonota ||
    !req.body.tgl_pembelian ||
    !req.body.id_distributor
  ) {
    return next(new AppError("Input tidak lengkap", 400));
  }

  const { nonota, tgl_pembelian } = req.body;
  const id_distributor = Number(req.body.id_distributor);

  if (Number.isNaN(id_distributor)) {
    return next(new AppError("ID distributor harus angka", 400));
  }

  const distributor = await prisma.distributor.findUnique({
    where: { id: id_distributor },
  });

  if (!distributor) {
    return next(new AppError("Distributor tidak ditemukan", 404));
  }

  const data = await prisma.pembelian.create({
    data: {
      nonota,
      tgl_pembelian: new Date(tgl_pembelian),
      total_bayar: 0,
      id_distributor,
    },
  });

  return successResponse(res, data, "Pembelian berhasil dibuat", 201);
});