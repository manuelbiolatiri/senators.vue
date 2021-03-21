const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../models/database");

const register = {
  async signUP(req, res) {
    // body values
    const { firstName, lastName, email, password } = req.body;
        try {
            // generate bcrypt salt
            const salt = await bcrypt.genSalt(10);
            // hash password
            const hashedPassword = await bcrypt.hash(password, salt);

            // check if user exist (email check)
            const checkQuery = `SELECT * FROM users WHERE email=?`;
            const value = [email];
            await pool.query(checkQuery, value, (err, result) => {
                if (!result || !Array.isArray(result)) {
                    return res.status(400).json({
                        status: "error",
                        error: "error fetching user",
                    });
                }
                if (result.length == 1) {
                    return res.status(400).json({
                        status: "error",
                        error: "User already exist.",
                    });
                }
        })
      // users sign up
        const signUpQuery = `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`;
        const userValue = [firstName, lastName, email, hashedPassword];
        await pool.query(signUpQuery, userValue, (err, result) => {
        if (result) {
          //   console.log("ressssss", result);
          console.log("ressssss", signUpQuery);
          return res.status(400).json({
              status: "success",
            data: {
              firstName,
              lastName,
              email,
            },
            message: "User account successfully created",
          });
        } else {
          return res.status(400).json({
            status: "error",
            error: "Unable to create an account at the moment, Pls try again later.",
          });
        }
      });

    } catch (e) {
      console.log(e);
    }
  },
  async logIn(req, res) {
    // body values
    const { email, password } = req.body;

    try {
      // empty body values
      if (!email || !password) {
        return res.status(400).json({
          status: "error",
          error: "all fields are required",
        });
      }

      // email check (if user with email exist)
      const logInQuery = `SELECT * FROM users WHERE email=?`;
      const value = [email];
      pool.query(logInQuery, value, (err, result) => {
        if (err) {
          return res.status(400).json({
            status: "error",
            error: "You cannot login at the moment.",
          });
        }
        if (result.length == 0) {
          return res.status(400).json({
            status: "error",
            error: "User does not exist, please sign up",
          });
        } else {
          // compare password
          bcrypt.compare(password, result[0].password, (err, deocoded) => {
            // user login
            if (email === result[0].email && deocoded === true) {
              jwt.sign({ email, password }, process.env.SECRET_KEY, { expiresIn: "24h" }, (err, token) => {
                  return res.status(201).json({
                    status: "success",
                    message: "User successfully loged in",
                    data: {
                      token,
                      result,
                    },
                  });
                }
              );
            }
            // incorrect email and password
            else {
              res.status(403).json({
                status: "error",
                error: "Incorrect email or password",
              });
            }
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  // token verification
  verifyToken(req, res, next) {
    // header key and value
    const headers = req.headers["authorization"];

    if (typeof headers !== "undefined") {
      const beareHeader = headers.split(" ");
      const token = beareHeader[1];

      req.token = token;
      next();
    } else {
      // incorrect header and value
      res.status(403).json({
        status: "error",
        error: "forbidden",
      });
    }
  },
};

// export register routes
module.exports = register;