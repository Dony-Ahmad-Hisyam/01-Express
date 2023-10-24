const express = require("express");
const mhsRouter = require("./routes/mahasiswa");
const jurRouter = require("./routes/jurusan");
const bodyPrs = require("body-parser");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());
const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public/images")));

app.use(bodyPrs.urlencoded({ extended: false }));
app.use(bodyPrs.json());
app.use("/api/mhs", mhsRouter);
app.use("/api/jurusan", jurRouter);

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
