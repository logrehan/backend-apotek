//utama
import express from "express"; //ini untuk mengimpor Express.js, yaitu framework backend untuk Node.js
//fungsi express digunakan untuk membuat aplikasi web dan API dengan sangat mudah, dia bisa bikin server, API, routing, dan ngirim response ke client (http)
import cors from "cors"; //ini untuk mengimpor CORS (Cross-Origin Resource Sharing), middleware
//Cross-Origin Resource Sharing, ngizinin app frontend (client) buat akses API backend (server) yang beda domain, port, atau protokol, cors ini penting buat kemanan, karena bisa ngatur siapa aja yang bisa akses API
import { errorHandler } from "./middleware/errorHandler.js"; //ini untuk mengimpor middleware errorHandler 

//bagian route-route-an
import jenisObatRoutes from "./routes/jenisObatRoutes.js";
import obatRoutes from "./routes/obatRoutes.js";
import pelangganRoutes from "./routes/pelangganRoutes.js";
import keranjangRoutes from "./routes/keranjangRoutes.js";
import penjualanRoutes from "./routes/penjualanRoutes.js";
import pengirimanRoutes from "./routes/pengirimanRoutes.js";
import metodeBayarRoutes from "./routes/metodeBayarRoutes.js";
import jenisPengirimanRoutes from "./routes/jenisPengirimanRoutes.js";
import distributorRoutes from "./routes/distributorRoutes.js";
import pembelianRoutes from "./routes/pembelianRoutes.js";
import detailPembelianRoutes from "./routes/detailPembelianRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

//instance
const app = express(); //ini untuk membuat instance dari Express.js, yang akan kita gunakan untuk mendefinisikan route dan middleware

//fix error bigint
BigInt.prototype.toJSON = function () {
  //ini untuk mengatasi masalah dengan tipe data BigInt saat mengirim data ke client dalam format JSON, karena secara default, JSON.stringify tidak bisa menangani BigInt, jadi kita tambahkan method toJSON ke prototype BigInt yang akan mengubah BigInt menjadi string saat di-serialize ke JSON
  return this.toString(); //ini mengubah nilai BigInt menjadi string saat di-serialize ke JSON
}

//middleware
app.use(cors()); //ini untuk menggunakan middleware CORS di aplikasi Express, yang memungkinkan kita untuk mengatur kebijakan akses lintas domain
app.use(express.json()); //ini untuk menggunakan middleware bawaan dari Express yang memungkinkan kita untuk parsing JSON di body request, jadi kita bisa ngirim data dalam format JSON ke server dan server bisa memprosesnya dengan mudah

// TEST API
app.get("/", (req, res) => {
  res.json({
    message: "API Apotek Online Aktif 🚀",
  });
});

// USE BUAT ROUTES
app.use("/jenis-obat", jenisObatRoutes);
app.use("/obat", obatRoutes);
app.use("/pelanggan", pelangganRoutes);
app.use("/keranjang", keranjangRoutes);
app.use("/penjualan", penjualanRoutes);
app.use("/pengiriman", pengirimanRoutes);
app.use("/metode-bayar", metodeBayarRoutes);
app.use("/jenis-pengiriman", jenisPengirimanRoutes);
app.use("/distributor", distributorRoutes);
app.use("/pembelian", pembelianRoutes);
app.use("/detail-pembelian", detailPembelianRoutes);
app.use("/users", usersRoutes);

app.use(errorHandler); //ini untuk menggunakan middleware errorHandler yang kita buat, yang akan menangani semua error yang terjadi di aplikasi dan mengirim response error yang sesuai ke client

//buat runnig servernya 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running di http://localhost:${PORT}`);
});

