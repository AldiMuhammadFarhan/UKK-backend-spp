let {
    //Petugas
    serviceAddPetugas,
    serviceGetPetugas,
    serviceGetPetugasById,
    serviceUpdatePetugas,
    serviceDeletePetugas,
    serviceGetUserByPetugas,
    //SPP
    serviceAddSpp,
    serviceGetSpp,
    serviceGetSppById,
    serviceUpdateSpp,
    serviceDeleteSpp,
    //Kelas
    serviceAddKelas,
    serviceGetKelas,
    serviceGetKelasById,
    serviceUpdateKelas,
    serviceDeleteKelas,
    //Siswa
    serviceAddSiswa,
    serviceDeleteSiswa,
    serviceGetSiswa,
    serviceGetSiswaById,
    serviceUpdateSiswa,
    //Entri
    serviceAddBayar,
    serviceUpdateBayar,
    //Lihat Pembayaran
    serviceGetTransaksiById,
    serviceGetTransaksi,
    // laporan
    serviceGetLaporan
} = require("./service.admin");

let { genSalt, hashSync, compareSync } = require("bcrypt");
let { sign } = require("jsonwebtoken");
let xl = require('excel4node');
let wb = new xl.Workbook();
var ws = wb.addWorksheet('Laporan SPP')
var style = wb.createStyle({
    font: {
        color: 'green',
        size: 12,
    },
});

module.exports = {
    // CRUD ADMIN dan lOGIN ADMIN
    controllerAddPetugas: (req, res) => {
        let register_Data = {
            username: req.body.username,
            password: req.body.password,
            nama_petugas: req.body.nama,
            level: req.body.level
        };
        serviceAddPetugas(register_Data, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    succes: 0,
                    message: "database connection error"
                });
            } else {
                return res.json({
                    succes: 1
                })
            }
        });
    },
    controllerGetPetugasById: (req, res) => {
        let id = req.params.id;
        serviceGetPetugasById(id, (err, results) => {
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
    },
    controllerGetPetugas: (req, res) => {
        serviceGetPetugas((err, results) => {
            if (err) {
                console.error(err);
                return;
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    controllerUpdatePetugas: (req, res) => {
        let body = req.body;
        serviceUpdatePetugas(body, (err, results) => {
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
    controllerDeletePetugas: (req, res) => {
        let data = req.body
        serviceDeletePetugas(data, (err, results) => {
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
                    message: "user delete succesfuly"
                });
            }
        });
    },
    controllerLogin: (req, res) => {
        let body = {
            username: "admin",
            password: "admin123"
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
    // CRUD SPP 
    controllerAddSpp: (req, res) => {
        let spp_data = {
            tahun: req.body.tahun,
            nominal: req.body.nominal,
        };
        serviceAddSpp(spp_data, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    succes: 0,
                    message: "spp connection error"
                });
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    controllerGetSppById: (req, res) => {
        let id_spp = req.params.id;
        serviceGetSppById(id_spp, (err, results) => {
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
    },
    controllerGetSpp: (req, res) => {
        serviceGetSpp((err, results) => {
            if (err) {
                console.error(err);
                return;
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    controllerUpdateSpp: (req, res) => {
        let body = req.body;
        serviceUpdateSpp(body, (err, results) => {
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
    controllerDeleteSpp: (req, res) => {
        let data = req.body
        serviceDeleteSpp(data, (err, results) => {
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
                    message: "user delete succesfuly"
                });
            }
        });
    },
    // CRUD KELAS
    controllerAddKelas: (req, res) => {
        let kelas_Data = {
            nama_kelas: req.body.kelas,
            kejuruan: req.body.jurusan,
        };
        serviceAddKelas(kelas_Data, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    succes: 0,
                    message: "spp connection error"
                });
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    controllerGetKelasById: (req, res) => {
        let id_spp = req.params.id;
        serviceGetKelasById(id_spp, (err, results) => {
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
    },
    controllerGetKelas: (req, res) => {
        serviceGetKelas((err, results) => {
            if (err) {
                console.error(err);
                return;
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    controllerUpdateKelas: (req, res) => {
        let body = req.body;
        serviceUpdateKelas(body, (err, results) => {
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
    controllerDeleteKelas: (req, res) => {
        let data = req.body
        serviceDeleteKelas(data, (err, results) => {
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
                    message: "user delete succesfuly"
                });
            }
        });
    },
    // CRUD SISWA
    controllerAddSiswa: (req, res) => {
        let siswa_Data = {
            nisn: req.body.nisn,
            nis: req.body.nis,
            nama: req.body.nama,
            id_kelas: req.body.kelas,
            alamat: req.body.alamat,
            no_telp: req.body.nomer,
            id_spp: req.body.spp,
        };
        serviceAddSiswa(siswa_Data, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    succes: 0,
                    message: "spp connection error"
                });
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    controllerGetSiswaById: (req, res) => {
        let id_spp = req.params.id;
        serviceGetSiswaById(id_spp, (err, results) => {
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
    },
    controllerGetSiswa: (req, res) => {
        serviceGetSiswa((err, results) => {
            if (err) {
                console.error(err);
                return;
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    controllerUpdateSiswa: (req, res) => {
        let body = req.body;
        serviceUpdateSiswa(body, (err, results) => {
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
    controllerDeleteSiswa: (req, res) => {
        let data = req.body
        serviceDeleteSiswa(data, (err, results) => {
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
                    message: "user delete succesfuly"
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
    },
    controllerGetTransaksi: (req, res) => {
        serviceGetTransaksi((err, results) => {
            if (err) {
                console.error(err);
                return;
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    // generate laporan
    controllerGetLaporan: (req, res) => {
        serviceGetLaporan((err, results) => {
            ws.cell(1, 1).string("kode pembayaran").style(style);
            ws.cell(1, 2).string("kode petugas").style(style);
            ws.cell(1, 3).string("nisn").style(style);
            ws.cell(1, 4).string("tanggal bayar").style(style);
            ws.cell(1, 5).string("bulan bayar").style(style);
            ws.cell(1, 6).string("tahun bayar").style(style);
            ws.cell(1, 7).string("kode spp").style(style);
            ws.cell(1, 8).string("jumlah bayar").style(style);;

            for (let i = 0; results.length > i; i++) {
                ws.cell(i + 2, 1).number(results[i].id_pembayaran).style(style);
                ws.cell(i + 2, 2).number(results[i].id_petugas).style(style);
                ws.cell(i + 2, 3).string(results[i].nisn).style(style);
                ws.cell(i + 2, 4).string(results[i].tgl_bayar).style(style);
                ws.cell(i + 2, 5).string(results[i].bulan_bayar).style(style);
                ws.cell(i + 2, 6).string(results[i].tahun_bayar).style(style);
                ws.cell(i + 2, 7).number(results[i].id_spp).style(style);
                ws.cell(i + 2, 8).number(results[i].jumlah_bayar).style(style);;
            }
            if (err) {
                return res.json({
                    message: "err"
                })
            } if (!results) {
                return res.json({
                    message: "gk masuk"
                })
            } else {
                console.log(results);
                return wb.write('laporan_excel.xlsx');
            }

        })
    }
};
