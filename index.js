const express = require("express");
const mhsRouter = require("./routes/mahasiswa");
const app = express();
const port = 3000;

app.use("/api/mhs", mhsRouter);

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
