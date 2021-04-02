let db = require('../config/connection');

module.exports = {
    // CRUD petugas DAN LOGIN Petugas
    serviceAddPetugas: (register_data, callBack) => {
        db.query(
            `insert into petugas(username , password , nama_petugas , level )
              values (?,?,?,?)`,
            [
                register_data.username,
                register_data.password,
                register_data.nama_petugas,
                register_data.level
            ],
            (error, result, res) => {
                if (error) {
                    return callBack(error);
                } else {
                    return callBack(null, result);
                }
            }
        );
    },
    serviceGetPetugas: callBack => {
        db.query(`select * from petugas`, [], (err, results, fields) => {
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, results);
            }
        });
    },
    serviceGetPetugasById: (id_petugas, callBack) => {
        db.query(
            `select * from petugas where id_petugas = ?`,
            [id_petugas],
            (err, resuls, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, resuls[0]);
                }
            }
        );
    },
    serviceUpdatePetugas: (data, callBack) => {
        db.query(
            `update petugas set username=?, password=?, nama_petugas=?, level=? where id_petugas=?`,
            [
                data.username,
                data.password,
                data.nama_petugas,
                data.level,
                data.id_petugas
            ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    serviceDeletePetugas: (data, callBack) => {
        db.query(`select * from petugas where id_petugas=?`,
            [data.id_petugas],
            (err, result) => {
                if (err) {
                    callBack(err)
                } if (!result) {
                    callBack(result)
                } else {
                    db.query(`delete from petugas where id_petugas=?`,
                        [data.id_petugas])
                    return callBack(null, result[0])
                }
            })
    },
    serviceGetUserByPetugas: (username, callBack) => {
        db.query(
            `select username, password from petugas where username=?`,
            [username],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results[0]);
                }
            }
        );
    },
    // CRUD SPP
    serviceAddSpp: (spp_data, callBack) => {
        db.query(
            `insert into spp(tahun , nominal )
          values (?,?)`,
            [
                spp_data.tahun,
                spp_data.nominal
            ],
            (error, result, res) => {
                if (error) {
                    return callBack(error);
                } else {
                    return callBack(null, result);
                }
            }
        );
    },
    serviceGetSpp: callBack => {
        db.query(`select * from spp`, [], (err, results, fields) => {
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, results);
            }
        });
    },
    serviceGetSppById: (id_spp, callBack) => {
        db.query(
            `select * from spp where id_spp = ?`,
            [id_spp],
            (err, resuls, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, resuls[0]);
                }
            }
        );
    },
    serviceUpdateSpp: (data, callBack) => {
        db.query(
            `update spp set tahun=?, nominal=? where id_spp=?`,
            [
                data.tahun,
                data.nominal,
                data.id_spp
            ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    serviceDeleteSpp: (data, callBack) => {
        db.query(`select * from spp where id_spp=?`,
            [data.id_spp],
            (err, result) => {
                if (err) {
                    callBack(err)
                } if (!result) {
                    callBack(result)
                } else {
                    db.query(`delete from spp where id_spp=?`,
                        [data.id_spp])
                    return callBack(null, result[0])
                }
            })
    },
    // CRUD KELAS
    serviceAddKelas: (kelas_data, callBack) => {
        db.query(
            `insert into kelas (nama_kelas , kejuruan )
      values (?,?)`,
            [
                kelas_data.nama_kelas,
                kelas_data.kejuruan
            ],
            (error, result, res) => {
                if (error) {
                    return callBack(error);
                } else {
                    return callBack(null, result);
                }
            }
        );
    },
    serviceGetKelas: callBack => {
        db.query(`select * from kelas`, [], (err, results, fields) => {
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, results);
            }
        });
    },
    serviceGetKelasById: (id_kelas, callBack) => {
        db.query(
            `select * from kelas where id_kelas = ?`,
            [id_kelas],
            (err, resuls, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, resuls[0]);
                }
            }
        );
    },
    serviceUpdateKelas: (data, callBack) => {
        db.query(
            `update kelas set nama_kelas=?, kejuruan=? where id_kelas=?`,
            [
                data.nama_kelas,
                data.kejuruan,
                data.id_kelas
            ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    serviceDeleteKelas: (data, callBack) => {
        db.query(`select * from kelas where id_kelas=?`,
            [data.id_kelas],
            (err, result) => {
                if (err) {
                    callBack(err)
                } if (!result) {
                    callBack(result)
                } else {
                    db.query(`delete from kelas where id_kelas=?`,
                        [data.id_kelas])
                    return callBack(null, result[0])
                }
            })
    },
    // CRUD SISWA
    serviceAddSiswa: (siswa_data, callBack) => {
        db.query(
            `insert into siswa(nisn , nis , nama, id_kelas, alamat, no_telp, id_spp)
  values (?,?,?,?,?,?,?)`,
            [
                siswa_data.nisn,
                siswa_data.nis,
                siswa_data.nama,
                siswa_data.id_kelas,
                siswa_data.alamat,
                siswa_data.no_telp,
                siswa_data.id_spp
            ],
            (error, result, res) => {
                if (error) {
                    return callBack(error);
                } else {
                    return callBack(null, result);
                }
            }
        );
    },
    serviceGetSiswa: callBack => {
        db.query(`select * from Siswa`, [], (err, results, fields) => {
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, results);
            }
        });
    },
    serviceGetSiswaById: (nisn, callBack) => {
        db.query(
            `select * from kelas where nisn = ?`,
            [nisn],
            (err, resuls, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, resuls[0]);
                }
            }
        );
    },
    serviceUpdateSiswa: (data, callBack) => {
        db.query(
            `update siswa set nis=?, nama=?, id_kelas=?, alamat=?, no_telp=?, id_spp=? where nisn=?`,
            [
                data.nis,
                data.nama,
                data.id_kelas,
                data.alamat,
                data.no_telp,
                data.id_spp,
                data.nisn
            ],
            (err, result) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, result);
                }
            }
        );
    },
    serviceDeleteSiswa: (data, callBack) => {
        db.query(`select * from siswa where nisn=?`,
            [data.nisn],
            (err, result) => {
                if (err) {
                    callBack(err)
                } if (!result) {
                    callBack(result)
                } else {
                    db.query(`delete from siswa where nisn=?`,
                        [data.nisn])
                    return callBack(null, result[0])
                }
            })
    },
    // entri masuk
    serviceAddBayar: (entri_data, callBack) => {
        db.query(
            `insert into pembayaran(id_petugas , nisn , tgl_bayar, bulan_bayar, tahun_bayar, id_spp, jumlah_bayar,kurang_bayar,status)
  values (?,?,?,?,?,?,?,?,?)`,
            [
                entri_data.id_petugas,
                entri_data.nisn,
                entri_data.tgl_bayar,
                entri_data.bulan_bayar,
                entri_data.tahun_bayar,
                entri_data.id_spp,
                entri_data.jumlah_bayar,
                entri_data.kurang_bayar,
                entri_data.status
            ],
            (error, result, res) => {
                if (error) {
                    return callBack(error);
                } else {
                    return callBack(null, result)
                }
            }
        );
    },
    //update pembayaran
    serviceUpdateBayar: (data, callBack) => {
        db.query(
            `update pembayaran set kurang_bayar=? , status=? where id_pembayaran=?`,
            [

                data.kurang_bayar,
                data.status,
                data.id_pembayaran
            ],
            (err, result) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, result);
                }
            }
        );
    },
    //lihat pembayaran
    serviceGetTransaksiById: (nisn, callBack) => {
        db.query(
            `SELECT * FROM pembayaran 
            JOIN siswa ON pembayaran.nisn = siswa.nisn
            WHERE pembayaran.nisn = ?`,
            [nisn],
            (err, resuls, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, resuls[0]);
                }
            }
        );
    },
    serviceGetTransaksi: callBack => {
        db.query(`SELECT * FROM pembayaran
        left JOIN siswa ON pembayaran.nisn = siswa.nisn
        left JOIN petugas ON pembayaran.id_petugas = petugas.id_petugas `, [], (err, results, fields) => {
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, results);
            }
        });
    },
    serviceGetLaporan: callBack => {
        db.query(`SELECT * FROM pembayaran `, [], (err, results, fields) => {
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, results);
            }
        });
    },
}
