let { controllerLogin, controllerGetTransaksiById } = require('./control.siswa')
let router = require("express").Router();

router.post("/login/siswa", controllerLogin);
router.get("/riwayat/:id", controllerGetTransaksiById);

module.exports = router;