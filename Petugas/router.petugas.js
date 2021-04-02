let {
    //control petugas
    controllerLogin,
    //control entri
    controllerAddBayar,
    controllerUpdateBayar,
    //control lihat pembayaran
    controllerGetTransaksiById
} = require("./control.petugas");

let router = require("express").Router();
let { checkToken } = require("../auth/validasi_token");
// Petugas
router.post("/login/petugas", controllerLogin);
//entri
router.post("/pembayaran", checkToken, controllerAddBayar);
router.patch("/updatebayar", checkToken, controllerUpdateBayar);
//lihat pembayaran
router.get("/riwayat/:id", controllerGetTransaksiById);
module.exports = router;