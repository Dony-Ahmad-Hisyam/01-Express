const express = require("express");
const mhsRouter = require("./routes/mahasiswa");
const bodyPrs = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyPrs.urlencoded({ extended: false }));
app.use(bodyPrs.json());

app.use("/api/mhs", mhsRouter);

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
