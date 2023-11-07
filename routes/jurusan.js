const express = require("express");
const router = express.Router();
const authenticateToken = require("../routes/auth/midleware/authenticateToken");
const { body, validationResult } = require("express-validator");

const connection = require("../config/db");

router.get("/", authenticateToken, function (req, res) {
  connection.query("SELECT * from jurusan", function (err, rows) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        status: false,
        message: "Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data Mahasiswa",
        data: rows,
      });
    }
  });
});

router.post("/store", authenticateToken, [
  body("nama_jurusan").notEmpty(),
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }
    let Data = {
      nama_jurusan: req.body.nama_jurusan,
    };
    connection.query("INSERT into jurusan set ? ", Data, function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Sukses..!",
          data: rows[0],
        });
      }
    });
  },
]);

router.get("/(:id_j)", authenticateToken, function (req, res) {
  let id_j = req.params.id_j;
  connection.query(
    `SELECT * From jurusan where id_j = ${id_j}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
        });
      }
      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: "Not Found",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data Jurusan",
          data: rows[0],
        });
      }
    }
  );
});

router.patch(
  "/update/(:id_j)",
  authenticateToken,
  [body("nama_jurusan").notEmpty()],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }
    let id_j = req.params.id_j;
    let Data = {
      nama_jurusan: req.body.nama_jurusan,
    };
    connection.query(
      `UPDATE jurusan set ? where id_j = ${id_j}`,
      Data,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Server Error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Update Sukses..!",
          });
        }
      }
    );
  }
);

router.delete("/delete/(:id_j)", authenticateToken, function (req, res) {
  let id_j = req.params.id_j;
  connection.query(
    `DELETE From jurusan where id_j = ${id_j}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data has ben delete..!!",
        });
      }
    }
  );
});

module.exports = router;
