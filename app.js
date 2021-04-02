require("dotenv").config();
let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let adminRouter = require("./Admin/router.admin");
let siswaRouter = require("./Siswa/router.siswa");
let petugasRouter = require("./Petugas/router.petugas");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.json());
app.use("/api/admin", adminRouter);
app.use("/api/siswa", siswaRouter);
app.use("/api/petugas", petugasRouter);

app.listen(process.env.APP_PORT, () => {
    console.error("running on port " + process.env.APP_PORT);
});
