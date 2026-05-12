import { prisma } from "../lib/prisma.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/appError.js";

export const getDetailPembelian = asyncHandler(async (req, res) => {
  const data = await prisma.detail_pembelian.findMany({
    include: {
      obat: true,
      pembelian: true,
    },
  });
  return successResponse(res, data, "Data detail pembelian");
});

export const createDetailPembelian = asyncHandler(async (req, res, next) => {
  
  if (
    !req.body.id_obat ||
    !req.body.jumlah_beli ||
    !req.body.harga_beli ||
    !req.body.id_pembelian
  ) {
    return next(new AppError("Input tidak lengkap", 400));
  }
  const id_obat = Number(req.body.id_obat);
  const jumlah_beli = Number(req.body.jumlah_beli);
  const harga_beli = Number(req.body.harga_beli);
  const id_pembelian = Number(req.body.id_pembelian);

  if (
    Number.isNaN(id_obat) ||
    Number.isNaN(jumlah_beli) ||
    Number.isNaN(harga_beli) ||
    Number.isNaN(id_pembelian)
  ) {
    return next(new AppError("Input harus angka", 400));
  }

  if (jumlah_beli <= 0 || harga_beli <= 0) {
    return next(new AppError("Jumlah atau harga tidak valid", 400));
  }

  const obat = await prisma.obat.findUnique({
    where: { id: id_obat },
  });

  if (!obat) {
    return next(new AppError("Obat tidak ditemukan", 404));
  }

  const pembelian = await prisma.pembelian.findUnique({
    where: { id: id_pembelian },
  });

  if (!pembelian) {
    return next(new AppError("Pembelian tidak ditemukan", 404));
  }

  const subtotal = jumlah_beli * harga_beli;

  const data = await prisma.$transaction(async (tx) => {
    const detail = await tx.detail_pembelian.create({
      data: {
        id_obat,
        jumlah_beli,
        harga_beli,
        subtotal,
        id_pembelian,
      },
    });

    await tx.obat.update({
      where: { id: id_obat },
      data: {
        stok: { increment: jumlah_beli },
      },
    });

    await tx.pembelian.update({
      where: { id: id_pembelian },
      data: {
        total_bayar: {
          increment: subtotal,
        },
      },
    });

    return detail;
  });

  return successResponse(
    res,
    data,
    "Detail pembelian berhasil ditambahkan",
    201,
  );
});
