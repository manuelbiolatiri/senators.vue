const jwt = require('jsonwebtoken');
const pool = require('../models/database');

const senatorController = {
    createSenator(req, res) {
        // body values
        const { name, phoneNumber, email } = req.body;

        try {
            // verify token
            jwt.verify(req.token, process.env.SECRET_KEY, async (err) => {
                // incorrect token
                if (err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    })
                }
                // check if email exist (email check)
                const checkQuery = `SELECT * FROM users WHERE email=?`;
                const value = [email];
                const check = await pool.query(checkQuery, value);
                console.log("check email",check)
                // check if user exist response
                if (check.rows[0]) {
                    return res.status(400).json({
                        status: 'error',
                        error: 'email already exist'
                    });
                }

                const findState = `SELECT * FROM states WHERE state=?`;
                const stateValue = [req.body.state];
                const findId = await pool.query(findState, stateValue);
                let state = findId.rows[0].id;

                // database senator query
                const create = `INSERT INTO senators (name, email, phoneNumber, state)
                                VALUES(?, ?, ?, ?)`;
                const values = [name, email, phoneNumber, state];
                const createQuery = await pool.query(create, values);
                console.log("check email",createQuery, createQuery.rows[0])
                // senator response
                res.status(201).json({
                    status: 'success',
                    data: {
                        message: 'senator successfully created',
                        name: createQuery.rows[0].name,
                        email: createQuery.rows[0].email,
                        phoneNumber: createQuery.rows[0].phoneNumber,
                        state: createQuery.rows[0].state
                    }
                })
            });

        }
        catch (e) {
            console.log("error on creating a senator", e);
        }
    },
    async modifySenator(req, res) {
        //  parameter (number)
        const id = parseInt(req.params.id);

        try {
            // verify token
            jwt.verify(req.token, process.env.SECRET_KEY, async (err) => {

                // incorrect token
                if (err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    })
                }
            })
            // select an post query
            const check = `SELECT * FROM senators WHERE id=?`;
            const checkValue = [id];
            const checkQuery = await pool.query(check, checkValue);

            // post check response
            if (!checkQuery.rows[0]) {
                return res.status(400).json({
                    status: 'error',
                    error: 'senator does not exist'
                });
            }
            console.log("checkQuery senator", checkQuery)
            // body values
            const name = req.body.name || checkQuery.rows[0].name;
            const phoneNumber = req.body.phoneNumber || checkQuery.rows[0].phoneNumber;
            const email = req.body.phoneNumber || checkQuery.rows[0].email;
            const state = req.body.phoneNumber || checkQuery.rows[0].state;

            // check if email exist (email check)
            const checkEmail = `SELECT * FROM users WHERE email=?`;
            const value = [email];
            const findOne = await pool.query(checkEmail, value);

            // check if user exist response
            if (findOne.rows[0]) {
                return res.status(400).json({
                    status: 'error',
                    error: 'email already exist'
                });
            }

            // update selected post query
            const modify = `UPDATE senators SET name=?, phoneNumber=?, email=?, state=? WHERE id=?`;
            const values = [name, phoneNumber, email, state, id];
            const modifyQuery = await pool.query(modify, values)
            console.log("modifyQuery senator", modifyQuery)
            // update response
            res.status(200).json({
                status: 'success',
                data: {
                    message: 'senator successfully updated',
                    name: modifyQuery.rows[0].name,
                    email: modifyQuery.rows[0].email,
                    phoneNumber: modifyQuery.rows[0].phoneNumber,
                    state: modifyQuery.rows[0].state
                }
            });

        }
        catch (e) {
            console.log(e)
        }
    },
    async deleteSenator(req, res) {
        //  parameter (number)
        const id = parseInt(req.params.id);
        try {
            // verify token
            jwt.verify(req.token, process.env.SECRET_KEY, async (err) => {
                // incorrect token
                if (err) {
                    return res.status(403).json({
                        status: 'error',
                        error: 'incorrect token'
                    });
                }
            })
            // select an post query
            const check = `SELECT * FROM senators WHERE id=?`;
            const checkValue = [id];
            const checkQuery = await pool.query(check, checkValue);

            // post check response
            if (!checkQuery.rows[0]) {
                return res.status(400).json({
                    status: 'error',
                    error: 'senator does not exist'
                });
            }

            // delete post query
            const remove = `DELETE FROM senators WHERE id=?`;
            const value = [id];
            const removeQuery = await pool.query(remove, value);

            // delete response
            res.status(200).json({
                status: 'success',
                data: {
                    message: 'post successfully deleted',
                    data: removeQuery.rows
                }
            });

        }
        catch (e) {
            console.log(e);
        }
    },
    async findSenatorById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const check = `SELECT * FROM senators WHERE id=?`;
            const checkValue = [id];
            const checkQuery = await pool.query(check, checkValue);
            // post check response
            if (!checkQuery.rows[0]) {
                return res.status(400).json({
                    status: 'error',
                    error: 'senator does not exist'
                });
            }
            const findState = `SELECT * FROM states WHERE id=?`;
            const stateValue = [checkQuery.rows[0].state];
            const findId = await pool.query(findState, stateValue);
            let state = findId.rows[0].state;
            res.status(200).json({
                status: 'success',
                data: {
                    message: 'Found one',
                    name: checkQuery.rows[0].name,
                    email: checkQuery.rows[0].email,
                    phoneNumber: checkQuery.rows[0].phoneNumber,
                    state
                }
            });
        } catch (error) {
            console.log("error on find one", error)

        }
    },
    async getAllSenators(req, res) {
        try {
                // get all posts query 
                const getSenators = await pool.query(`SELECT * FROM senators`);
            console.log("getSenators data", getSenators)
                // if there are no posts available
                if (!getSenators.rowCount) {
                    return res.status(400).json({
                        status: 'error',
                        error: 'Sorry, there are no senators at the moment'
                    });
                }

                // get response
                res.status(200).json({
                    status: 'success',
                    data: {
                          senators: getSenators.rows
                        }
                });
        }
        catch (e) {
            console.log(e)
        }
    },
}
// export senator controller to routes
module.exports = senatorController;
