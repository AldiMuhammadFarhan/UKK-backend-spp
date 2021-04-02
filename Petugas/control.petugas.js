let {
    //Petugas
    serviceGetUserByPetugas,
    //Entri
    serviceAddBayar,
    serviceUpdateBayar,
    //Lihat Pembayaran
    serviceGetTransaksiById
} = require("./service.petugas");

let { genSalt, hashSync, compareSync } = require("bcrypt");
let { sign } = require("jsonwebtoken");

module.exports = {
    controllerLogin: (req, res) => {
        let body = {
            username: req.body.username,
            password: req.body.password,
            level: !"admin"
        }
        serviceGetUserByPetugas(body.username, (err, results) => {
            if (err) {
                console.error(err);
            }
            let result = compareSync(body.password, results.password);
            if (results) {
                result.password = undefined;
                let jsonwebtoken = sign({ result: results }, "secretkey", {
                    expiresIn: "1h"
                });
                return res.json({ jsonwebtoken });
            }
            else {
                return res.json({
                    succes: 0,
                    message: "username or password invalid"
                });
            }
        });
    },
    // entri masuk
    controllerAddBayar: (req, res) => {
        let entri_data = {
            id_petugas: req.body.petugas,
            nisn: req.body.nisn,
            tgl_bayar: req.body.tgl,
            bulan_bayar: req.body.bulan,
            tahun_bayar: req.body.tahun,
            id_spp: req.body.spp,
            jumlah_bayar: req.body.jumlah,
            kurang_bayar: req.body.kurang,
            status: req.body.status
        };
        // console.log(entri_data);
        serviceAddBayar(entri_data, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    succes: 0,
                    message: "entri error"
                });
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    // update pembayaran
    controllerUpdateBayar: (req, res) => {
        let body = req.body;
        serviceUpdateBayar(body, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "update failed"
                });
            } else {
                return res.json({
                    succes: 1,
                    message: "update lur"
                });
            }
        });
    },
    //Lihat Pembayaran
    controllerGetTransaksiById: (req, res) => {
        let nisn = req.params.id;
        serviceGetTransaksiById(nisn, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Record not found"
                });
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    }
}