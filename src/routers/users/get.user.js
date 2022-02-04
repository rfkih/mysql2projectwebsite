const express = require("express");
const router = express.Router();
const connection = require("../../config/database");
const pool = require("../../config/database");




const getAllUserRouter = router.get("/", async (req, res) => {
    try {
      const connection = await pool.promise().getConnection();

      const { user_id } = req.body
  
      const sqlGetAllUser = "SELECT user_id FROM tokens WHERE = ?;";

      const dataUserId = user_id
     
  
      // result : berisi array of data untuk query SELECT , untuk lainnya akan berisi object
      // fields
      const result = await connection.query(sqlGetAllUser, dataUserId);
      connection.release();
  
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ error });

    }
  });


  module.exports = {getAllUserRouter}