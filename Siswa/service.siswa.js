let db = require('../config/connection');

module.exports = {
    serviceGetUserBySiswa: (nisn, callBack) => {
        db.query(
            `select nisn, nis, nama from siswa where nisn=?`,
            [nisn],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results[0]);
                }
            }
        );
    },
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