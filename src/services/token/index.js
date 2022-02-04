// Agar dapat mengakses variable pada file .env
require("dotenv").config();

const jwt = require("jsonwebtoken");
const key = process.env.JWT_KEY;
// data = { id: user.id }
const sign = (data) => {
  // result = "eyJhbGciOiJIUzI1NiJ9.cHVyd2FkaGlrYQ.d9ddNAbzhJIxNfipgpDXy4fIh_X3BfgtMHnl6R32aT0";
  const result = jwt.sign(data, key);
  return result;
};
const verify = (data) => jwt.verify(data, key);

module.exports = { sign, verify };

// const jwtResult = jwt.sign("purwadhika", "HDVEfnDYfU7Yp3ayY7pc");
// console.log({ jwtResult });

// const token =
//   "eyJhbGciOiJIUzI1NiJ9.cHVyd2FkaGlrYQ.d9ddNAbzhJIxNfipgpDXy4fIh_X3BfgtMHnl6R32aT0";

// Cara 1
// jwt.verify(token, "HDVEfnDYfU7Yp3ayY7pc", (err, result) => {
//   if (err) return console.log({ err: err.message });
//   console.log({ result });
// });

// Cara 2
// try {
//   const result = jwt.verify(token, "HDVEfnDYfU7Yp3ayY7pf");
//   console.log({ result });
// } catch (error) {
//   console.log({ error: error.message });
// }
