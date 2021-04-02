let {
    //control petugas
    controllerAddPetugas,
    controllerGetPetugas,
    controllerGetPetugasById,
    controllerUpdatePetugas,
    controllerDeletePetugas,
    controllerLogin,
    //control spp
    controllerAddSpp,
    controllerGetSpp,
    controllerGetSppById,
    controllerUpdateSpp,
    controllerDeleteSpp,
    //control kelas
    controllerAddKelas,
    controllerGetKelas,
    controllerGetKelasById,
    controllerUpdateKelas,
    controllerDeleteKelas,
    //control siswa
    controllerAddSiswa,
    controllerGetSiswa,
    controllerGetSiswaById,
    controllerUpdateSiswa,
    controllerDeleteSiswa,
    //control entri
    controllerAddBayar,
    controllerUpdateBayar,
    //control lihat pembayaran
    controllerGetTransaksiById,
    controllerGetTransaksi,
    //control laporan
    controllerGetLaporan
} = require("./control.admin");

let router = require("express").Router();
let { checkToken } = require("../auth/validasi_token");
// Petugas
router.post("/tambahpetugas", checkToken, controllerAddPetugas);
router.get("/ambilpetugas", checkToken, controllerGetPetugas);
router.get("/petugas/:id", checkToken, controllerGetPetugasById);
router.patch("/editpetugas", checkToken, controllerUpdatePetugas);
router.delete("/hapuspetugas", checkToken, controllerDeletePetugas);
router.post("/login", controllerLogin);
//Spp
router.post("/tambahspp", checkToken, controllerAddSpp);
router.get("/ambilspp", checkToken, controllerGetSpp);
router.get("/spp/:id", checkToken, controllerGetSppById);
router.patch("/editspp", checkToken, controllerUpdateSpp);
router.delete("/hapusspp", checkToken, controllerDeleteSpp);
//kelas
router.post("/tambahkelas", checkToken, controllerAddKelas);
router.get("/ambilkelas", checkToken, controllerGetKelas);
router.get("/kelas/:id", checkToken, controllerGetKelasById);
router.patch("/editkelas", checkToken, controllerUpdateKelas);
router.delete("/hapuskelas", checkToken, controllerDeleteKelas);
//siswa
router.post("/tambahsiswa", checkToken, controllerAddSiswa);
router.get("/ambilsiswa", checkToken, controllerGetSiswa);
router.get("/siswa/:id", checkToken, controllerGetSiswaById);
router.patch("/editsiswa", checkToken, controllerUpdateSiswa);
router.delete("/hapussiswa", checkToken, controllerDeleteSiswa);
//entri
router.post("/pembayaran", checkToken, controllerAddBayar);
router.patch("/updatebayar", checkToken, controllerUpdateBayar);
//lihat pembayaran
router.get("/riwayat/:id", controllerGetTransaksiById);
router.get("/riwayat", checkToken, controllerGetTransaksi);
//laporan
router.get("/laporan", checkToken, controllerGetLaporan);
module.exports = router;