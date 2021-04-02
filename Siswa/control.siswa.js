let { serviceGetUserBySiswa, serviceGetTransaksiById } = require('./service.siswa')

module.exports = {
    controllerLogin: (req, res) => {
        let body = {
            nisn: req.body.nisn,
            nis: req.body.nis,
            nama: req.body.nama
        }
        serviceGetUserBySiswa(body.nisn, (err, results) => {
            if (err) {
                console.error(err);
            }
            if (results) {
                return res.json({
                    succes: 1,
                    message: "login iso"
                })
            }
            else {
                return res.json({
                    succes: 0,
                    message: "username or password invalid"
                });
            }

        });
    },
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