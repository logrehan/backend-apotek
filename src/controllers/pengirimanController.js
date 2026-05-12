import { prisma } from "../lib/prisma.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/appError.js";

// GET semua pengiriman
export const getPengiriman = asyncHandler(async (req, res) => {
  const data = await prisma.pengiriman.findMany({
    include: {
      penjualan: true,
    },
  });

  return successResponse(res, data, "Data pengiriman");
});

// CREATE pengiriman
export const createPengiriman = asyncHandler(async (req, res, next) => {
  if (
    !req.body.id_penjualan ||
    !req.body.nama_kurir ||
    !req.body.telpon_kurir
  ) {
    return next(new AppError("Input tidak lengkap", 400));
  }

  const id_penjualan = Number(req.body.id_penjualan);
  const { nama_kurir, telpon_kurir } = req.body;

  if (Number.isNaN(id_penjualan)) {
    return next(new AppError("ID penjualan harus angka", 400));
  }

  const penjualan = await prisma.penjualan.findUnique({
    where: { id: id_penjualan },
  });

  if (!penjualan) {
    return next(new AppError("Penjualan tidak ditemukan", 404));
  }

  const data = await prisma.pengiriman.create({
    data: {
      id_penjualan,
      no_invoice: `INV-${Date.now()}`,
      tgl_kirim: new Date(),
      status_kirim: "Sedang_Dikirim",
      nama_kurir,
      telpon_kurir,
    },
  });

  return successResponse(res, data, "Pengiriman berhasil dibuat", 201);
});

// UPDATE status pengiriman
export const updateStatusPengiriman = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);
  const { status_kirim } = req.body;

  if (Number.isNaN(id) || id <= 0 || !status_kirim) {
    return next(new AppError("Input tidak lengkap / ID tidak valid", 400));
  }

  const allowedStatus = ["Sedang_Dikirim", "Selesai", "Dibatalkan"];

  if (!allowedStatus.includes(status_kirim)) {
    return next(new AppError("Status tidak valid", 400));
  }

  const existing = await prisma.pengiriman.findUnique({
    where: { id },
  });

  if (!existing) {
    return next(new AppError("Data pengiriman tidak ditemukan", 404));
  }

  const data = await prisma.pengiriman.update({
    where: { id },
    data: { status_kirim },
  });

  return successResponse(res, data, "Status berhasil diperbarui");
});