import { prisma } from "../lib/prisma.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/appError.js";

export const getKeranjang = asyncHandler(async (req, res, next) => {
  const id_pelanggan = Number(req.params.id_pelanggan);

  if (Number.isNaN(id_pelanggan) || id_pelanggan <= 0) {
    return next(new AppError("ID pelanggan tidak valid", 400));
  }

  const data = await prisma.keranjang.findMany({
    where: { id_pelanggan },
    include: { obat: true },
  });

  return successResponse(res, data, "Data keranjang berhasil diambil");
});

export const addKeranjang = asyncHandler(async (req, res, next) => {
  const id_pelanggan = Number(req.body.id_pelanggan);
  const id_obat = Number(req.body.id_obat);
  const jumlah_order = Number(req.body.jumlah_order);

  if (
    Number.isNaN(id_pelanggan) ||
    Number.isNaN(id_obat) ||
    Number.isNaN(jumlah_order)
  ) {
    return next(new AppError("Input harus angka", 400));
  }

  if (jumlah_order <= 0) {
    return next(new AppError("Jumlah order tidak valid", 400));
  }

  const obat = await prisma.obat.findUnique({
    where: { id: id_obat },
  });

  if (!obat) {
    return next(new AppError("Obat tidak ditemukan", 404));
  }

  if (jumlah_order > obat.stok) {
    return next(new AppError("Stok tidak mencukupi", 400));
  }

  const existingItem = await prisma.keranjang.findFirst({
    where: { id_pelanggan, id_obat },
  });

  let data;

  if (existingItem) {
    const newJumlah = existingItem.jumlah_order + jumlah_order;

    if (newJumlah > obat.stok) {
      return next(new AppError("Stok tidak mencukupi", 400));
    }

    data = await prisma.keranjang.update({
      where: { id: existingItem.id },
      data: {
        jumlah_order: newJumlah,
        subtotal: newJumlah * obat.harga_jual,
      },
    });
  } else {
    data = await prisma.keranjang.create({
      data: {
        id_pelanggan,
        id_obat,
        jumlah_order,
        harga: obat.harga_jual,
        subtotal: obat.harga_jual * jumlah_order,
      },
    });
  }

  return successResponse(res, data, "Berhasil menambahkan ke keranjang", 201);
});

export const updateKeranjang = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);
  const jumlah_order = Number(req.body.jumlah_order);

  if (Number.isNaN(id) || id <= 0) {
    return next(new AppError("ID tidak valid", 400));
  }

  if (Number.isNaN(jumlah_order) || jumlah_order <= 0) {
    return next(new AppError("Jumlah order tidak valid", 400));
  }

  const item = await prisma.keranjang.findUnique({
    where: { id },
  });

  if (!item) {
    return next(new AppError("Item keranjang tidak ditemukan", 404));
  }

  const obat = await prisma.obat.findUnique({
    where: { id: item.id_obat },
  });

  if (!obat) {
    return next(new AppError("Obat tidak ditemukan", 404));
  }

  if (jumlah_order > obat.stok) {
    return next(new AppError("Stok tidak mencukupi", 400));
  }

  const data = await prisma.keranjang.update({
    where: { id },
    data: {
      jumlah_order,
      subtotal: item.harga * jumlah_order,
    },
  });

  return successResponse(res, data, "Keranjang berhasil diperbarui");
});

export const deleteKeranjang = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return next(new AppError("ID tidak valid", 400));
  }

  const item = await prisma.keranjang.findUnique({
    where: { id },
  });

  if (!item) {
    return next(new AppError("Item tidak ditemukan", 404));
  }

  await prisma.keranjang.delete({
    where: { id },
  });

  return successResponse(res, null, "Item keranjang dihapus");
});
