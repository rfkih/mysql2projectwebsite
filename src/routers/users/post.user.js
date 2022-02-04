const express = require("express");
const router = express.Router();
const connection = require("../../config/database");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const pool = require("../../config/database");
const { sign } = require("../../services/token");




//Create User (Register)

const postUserRouter = router.post("/", async (req, res) => {
    try {
      const connection = await pool.promise().getConnection();
  
      const sqlAddUser = `insert into users set ?;`;
      const dataAddUser = req.body;

      const isEmail = validator.isEmail(req.body.email);
        if (!isEmail) return res.status(401).send({ message: "Format email salah" });

        dataAddUser.password = bcrypt.hashSync(req.body.password);
  
      const [result] = await connection.query(sqlAddUser, dataAddUser);
      connection.release();
  
      res.status(200).send({ result });
    } catch (error) {
      res.status(401).send(`error : ${error.message} `)
    }
  });
  

  //Login User (LOGIN)
  const postLoginUserRouter = router.post("/login", async (req, res) => {

        const { username, password } = req.body;

        const sql =
      "SELECT id, username, name, email, password, is_verified FROM users WHERE username = ?";
    const data = username;

    connection.query(sql, data, (err, result) => {
        if (err) return res.status(500).send({ err });
    
        // result = [ {id: 1, username: 'rochafi', password: '@khygasdbaksdga', is_verified:1} ]
        const user = result[0];
        // Jika user tidak ditemukan
        if (!user) return res.status(404).send({ message: "User not found" });
        // Compare password dari input user dengan yang ada pada database
        // password : lupa
        // user.password : $2a$10$Z6oqqmdaQMIBUI6OrXia8uSDVClZlBAbvBEya4sCNSJQ0RO0F/CH6
        const compareResult = bcrypt.compareSync(password, user.password);
        // Jika hasil compare tidak valid
        if (!compareResult)
          return res.status(401).send({ message: "Wrong password" });
    
        // Jika status user belum terverifikasi
        if (!user.is_verified)
          return res.status(401).send({ message: "Please verify your account" });
    
        // Create token
        // token = "eyJhbGciOiJIUzI1NiJ9.cHVyd2FkaGlrYQ.d9ddNAbzhJIxNfipgpDXy4fIh_X3BfgtMHnl6R32aT0"
        const token = sign({ id: user.id });
    
        const sqlInsertToken = "INSERT INTO tokens SET ?;";
        // data = "eyJhbGciOiJIUzI1NiJ9.cHVyd2FkaGlrYQ.d9ddNAbzhJIxNfipgpDXy4fIh_X3BfgtMHnl6R32aT0"
        const data = { user_id: user.id, token };
    
        connection.query(sqlInsertToken, data, (err, result) => {
          if (err) return res.status(500).send({ err });
    
          // Menghapus property password sebelum user dikirim sebagai response
          delete user.password;
          // Kirim ke user sebagai response
          res.status(200).send({ user, token });
        });
      });
    
  
    
    
  });

  module.exports = {postUserRouter, postLoginUserRouter }