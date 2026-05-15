-- CreateEnum
CREATE TYPE "jenis_pengiriman_jenis_kirim" AS ENUM ('ekonomi', 'kargo', 'regular', 'same_day', 'standar');

-- CreateEnum
CREATE TYPE "pengiriman_status_kirim" AS ENUM ('Sedang_Dikirim', 'Tiba_Di_Tujuan');

-- CreateEnum
CREATE TYPE "users_jabatan" AS ENUM ('admin', 'apoteker', 'karyawan', 'kasir', 'pemilik');

-- CreateEnum
CREATE TYPE "penjualan_status_order" AS ENUM ('Menunggu_Konfirmasi', 'Diproses', 'Menunggu_Kurir', 'Dibatalkan_Pembeli', 'Dibatalkan_Penjual', 'Bermasalah', 'Selesai');

-- CreateTable
CREATE TABLE "detail_pembelian" (
    "id" BIGSERIAL NOT NULL,
    "id_obat" BIGINT NOT NULL,
    "jumlah_beli" INTEGER NOT NULL,
    "harga_beli" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "id_pembelian" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "detail_pembelian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detail_penjualan" (
    "id" BIGSERIAL NOT NULL,
    "id_penjualan" BIGINT NOT NULL,
    "id_obat" BIGINT NOT NULL,
    "jumlah_beli" INTEGER NOT NULL,
    "harga_beli" DOUBLE PRECISION NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "detail_penjualan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distributor" (
    "id" BIGSERIAL NOT NULL,
    "nama_distributor" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "distributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jenis_obat" (
    "id" BIGSERIAL NOT NULL,
    "jenis" TEXT NOT NULL,
    "deskripsi" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "image_url" TEXT,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "jenis_obat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jenis_pengiriman" (
    "id" BIGSERIAL NOT NULL,
    "jenis_kirim" "jenis_pengiriman_jenis_kirim" NOT NULL,
    "nama_ekspedisi" TEXT NOT NULL,
    "logo_ekspedisi" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "jenis_pengiriman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keranjang" (
    "id" BIGSERIAL NOT NULL,
    "id_pelanggan" BIGINT NOT NULL,
    "id_obat" BIGINT NOT NULL,
    "jumlah_order" DOUBLE PRECISION NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "keranjang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metode_bayar" (
    "id" BIGSERIAL NOT NULL,
    "metode_pembayaran" TEXT NOT NULL,
    "tempat_bayar" TEXT NOT NULL,
    "no_rekening" TEXT,
    "url_logo" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "metode_bayar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obat" (
    "id" BIGSERIAL NOT NULL,
    "nama_obat" TEXT NOT NULL,
    "harga_jual" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "id_jenis" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deskripsi_obat" TEXT,
    "foto1" TEXT,
    "foto2" TEXT,
    "foto3" TEXT,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "obat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pelanggan" (
    "id" BIGSERIAL NOT NULL,
    "nama_pelanggan" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "no_telp" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "alamat1" TEXT NOT NULL,
    "alamat2" TEXT,
    "alamat3" TEXT,
    "foto" TEXT,
    "katasandi" TEXT NOT NULL,
    "kodepos1" TEXT NOT NULL,
    "kodepos2" TEXT,
    "kodepos3" TEXT,
    "kota1" TEXT NOT NULL,
    "kota2" TEXT,
    "kota3" TEXT,
    "propinsi1" TEXT NOT NULL,
    "propinsi2" TEXT,
    "propinsi3" TEXT,
    "url_ktp" TEXT,

    CONSTRAINT "pelanggan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pembelian" (
    "id" BIGSERIAL NOT NULL,
    "nonota" TEXT NOT NULL,
    "tgl_pembelian" TIMESTAMP(3) NOT NULL,
    "total_bayar" DOUBLE PRECISION NOT NULL,
    "id_distributor" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "pembelian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengiriman" (
    "id" BIGSERIAL NOT NULL,
    "id_penjualan" BIGINT NOT NULL,
    "no_invoice" TEXT NOT NULL,
    "tgl_kirim" TIMESTAMP(3) NOT NULL,
    "tgl_tiba" TIMESTAMP(3),
    "status_kirim" "pengiriman_status_kirim" NOT NULL,
    "nama_kurir" TEXT NOT NULL,
    "telpon_kurir" TEXT NOT NULL,
    "bukti_foto" TEXT,
    "keterangan" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "pengiriman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penjualan" (
    "id" BIGSERIAL NOT NULL,
    "id_metode_bayar" BIGINT NOT NULL,
    "tgl_penjualan" TIMESTAMP(3) NOT NULL,
    "url_resep" TEXT,
    "ongkos_kirim" DOUBLE PRECISION NOT NULL,
    "biaya_app" DOUBLE PRECISION NOT NULL,
    "total_bayar" DOUBLE PRECISION NOT NULL,
    "status_order" "penjualan_status_order" NOT NULL,
    "keterangan_status" TEXT,
    "id_jenis_kirim" BIGINT NOT NULL,
    "id_pelanggan" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "penjualan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "email_verified_at" TIMESTAMP(3),
    "jabatan" "users_jabatan" NOT NULL,
    "name" TEXT NOT NULL,
    "remember_token" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "detail_pembelian_id_obat_idx" ON "detail_pembelian"("id_obat");

-- CreateIndex
CREATE INDEX "detail_pembelian_id_pembelian_idx" ON "detail_pembelian"("id_pembelian");

-- CreateIndex
CREATE INDEX "detail_penjualan_id_obat_idx" ON "detail_penjualan"("id_obat");

-- CreateIndex
CREATE INDEX "detail_penjualan_id_penjualan_idx" ON "detail_penjualan"("id_penjualan");

-- CreateIndex
CREATE INDEX "keranjang_id_obat_idx" ON "keranjang"("id_obat");

-- CreateIndex
CREATE INDEX "keranjang_id_pelanggan_idx" ON "keranjang"("id_pelanggan");

-- CreateIndex
CREATE INDEX "obat_id_jenis_idx" ON "obat"("id_jenis");

-- CreateIndex
CREATE INDEX "pembelian_id_distributor_idx" ON "pembelian"("id_distributor");

-- CreateIndex
CREATE INDEX "pengiriman_id_penjualan_idx" ON "pengiriman"("id_penjualan");

-- CreateIndex
CREATE INDEX "penjualan_id_jenis_kirim_idx" ON "penjualan"("id_jenis_kirim");

-- CreateIndex
CREATE INDEX "penjualan_id_metode_bayar_idx" ON "penjualan"("id_metode_bayar");

-- CreateIndex
CREATE INDEX "penjualan_id_pelanggan_idx" ON "penjualan"("id_pelanggan");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "detail_pembelian" ADD CONSTRAINT "detail_pembelian_id_obat_fkey" FOREIGN KEY ("id_obat") REFERENCES "obat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_pembelian" ADD CONSTRAINT "detail_pembelian_id_pembelian_fkey" FOREIGN KEY ("id_pembelian") REFERENCES "pembelian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_penjualan" ADD CONSTRAINT "detail_penjualan_id_obat_fkey" FOREIGN KEY ("id_obat") REFERENCES "obat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_penjualan" ADD CONSTRAINT "detail_penjualan_id_penjualan_fkey" FOREIGN KEY ("id_penjualan") REFERENCES "penjualan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_id_obat_fkey" FOREIGN KEY ("id_obat") REFERENCES "obat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keranjang" ADD CONSTRAINT "keranjang_id_pelanggan_fkey" FOREIGN KEY ("id_pelanggan") REFERENCES "pelanggan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obat" ADD CONSTRAINT "obat_id_jenis_fkey" FOREIGN KEY ("id_jenis") REFERENCES "jenis_obat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembelian" ADD CONSTRAINT "pembelian_id_distributor_fkey" FOREIGN KEY ("id_distributor") REFERENCES "distributor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengiriman" ADD CONSTRAINT "pengiriman_id_penjualan_fkey" FOREIGN KEY ("id_penjualan") REFERENCES "penjualan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penjualan" ADD CONSTRAINT "penjualan_id_jenis_kirim_fkey" FOREIGN KEY ("id_jenis_kirim") REFERENCES "jenis_pengiriman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penjualan" ADD CONSTRAINT "penjualan_id_metode_bayar_fkey" FOREIGN KEY ("id_metode_bayar") REFERENCES "metode_bayar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penjualan" ADD CONSTRAINT "penjualan_id_pelanggan_fkey" FOREIGN KEY ("id_pelanggan") REFERENCES "pelanggan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
