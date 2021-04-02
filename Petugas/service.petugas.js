let db = require('../config/connection');

module.exports = {
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
}