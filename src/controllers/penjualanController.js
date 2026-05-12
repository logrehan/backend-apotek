import { prisma } from "../lib/prisma.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../utils/appError.js";

// GET riwayat penjualan pelanggan
export const getRiwayatPenjualan = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return next(new AppError("ID pelanggan tidak valid", 400));
  }

  const data = await prisma.penjualan.findMany({
    where: {
      id_pelanggan: id,
    },
    include: {
      detail_penjualan: {
        include: {
          obat: true,
        },
      },
      pengiriman: true,
    },
  });

  return successResponse(res, data, "Riwayat penjualan berhasil diambil");
});

// CHECKOUT
export const checkoutPenjualan = asyncHandler(async (req, res, next) => {
  if (
    !req.body.id_pelanggan ||
    !req.body.id_metode_bayar ||
    !req.body.id_jenis_kirim
  ) {
    return next(new AppError("Data checkout tidak lengkap", 400));
  }

  const id_pelanggan = Number(req.body.id_pelanggan);
  const id_metode_bayar = Number(req.body.id_metode_bayar);
  const id_jenis_kirim = Number(req.body.id_jenis_kirim);

  if (
    Number.isNaN(id_pelanggan) ||
    Number.isNaN(id_metode_bayar) ||
    Number.isNaN(id_jenis_kirim)
  ) {
    return next(new AppError("Input harus angka", 400));
  }

  const keranjang = await prisma.keranjang.findMany({
    where: { id_pelanggan },
  });

  if (keranjang.length === 0) {
    return next(new AppError("Keranjang kosong", 400));
  }

  // cek stok dulu
  for (const item of keranjang) {
    const obat = await prisma.obat.findUnique({
      where: { id: item.id_obat },
    });

    if (!obat || obat.stok < item.jumlah_order) {
      return next(new AppError("Stok tidak mencukupi", 400));
    }
  }

  const ongkir = 10000;
  const biaya_app = 2000;

  let total = 0;
  keranjang.forEach((item) => {
    total += item.subtotal;
  });

  const total_bayar = total + ongkir + biaya_app;

  const result = await prisma.$transaction(async (tx) => {
    const penjualan = await tx.penjualan.create({
      data: {
        id_metode_bayar,
        tgl_penjualan: new Date(),
        ongkos_kirim: ongkir,
        biaya_app,
        total_bayar,
        status_order: "Menunggu_Konfirmasi",
        id_jenis_kirim,
        id_pelanggan,
      },
    });

    for (const item of keranjang) {
      await tx.detail_penjualan.create({
        data: {
          id_penjualan: penjualan.id,
          id_obat: item.id_obat,
          jumlah_beli: item.jumlah_order,
          harga_beli: item.harga,
          subtotal: item.subtotal,
        },
      });

      await tx.obat.update({
        where: { id: item.id_obat },
        data: {
          stok: {
            decrement: item.jumlah_order,
          },
        },
      });
    }

    await tx.keranjang.deleteMany({
      where: { id_pelanggan },
    });

    return penjualan;
  });

  return successResponse(
    res,
    { penjualan_id: result.id },
    "Checkout berhasil",
    201,
  );
});
