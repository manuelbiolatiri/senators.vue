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
                const checkQuery = `SELECT * FROM senators WHERE email=?`;
                const value = [email];
                await pool.query(checkQuery, value, (err, result) => {
                if (result.length == 1) {
                    return res.status(400).json({
                    status: "error",
                    error: "senator with this email already exist.",
                    });
                }
                });

                const findState = `SELECT * FROM states WHERE state=?`;
                const stateValue = [req.body.state];
                await pool.query(findState, stateValue, async (err, result) => {
                    if (result) {
                    let state = JSON.stringify(result);
                        state = JSON.parse(state);
                        console.log("stateeee", state)
                    // database senator query
                    const create = `INSERT INTO senators (name, email, phoneNumber, state)
                                VALUES(?, ?, ?, ?)`;
                    const values = [name, email, phoneNumber, state[0].id];
                    await pool.query(create, values, (err, result) => {
                        if (result) {
                            return res.status(400).json({
                                status: "success",
                                data: {
                                    name,
                                    email,
                                    phoneNumber,
                                    state: state[0].id
                                },
                                message: "Senator successfully created",
                            });
                        } else {
                            return res.status(400).json({
                                status: "error",
                                error: "Unable to create senator at the moment, Pls try again later.",
                            });
                        }
                    });
                }
                })
            })
        }
        catch (e) {
            console.log("error on creating a senator", e);
        }
    },
    async modifySenator(req, res) {
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

            const check = `SELECT * FROM senators WHERE id=?`;
            const checkValue = [id];
            await pool.query(check, checkValue, async (err, result) => {
                if (result.length == 0) {
                    return res.status(400).json({
                        status: "error",
                        error: "senator does not exist",
                    });
                }
                let newResult = JSON.stringify(result);
                newResult = JSON.parse(newResult);
                // body values
                const name = req.body.name || newResult[0].name;
                const phoneNumber = req.body.phoneNumber || newResult[0].phoneNumber;
                const email = req.body.phoneNumber || newResult[0].email;
                const state = req.body.phoneNumber || newResult[0].state;

                // check if email exist (email check)
                const checkEmail = `SELECT * FROM users WHERE email=?`;
                const value = [email];
                await pool.query(checkEmail, value, async (err, founddEmail) => {
                    if (founddEmail[0]) {
                        return res.status(400).json({
                            status: 'error',
                            error: 'email already exist'
                        });
                    }
                
                });

                const modify = `UPDATE senators SET name=?, phoneNumber=?, email=?, state=? WHERE id=?`;
                const values = [name, phoneNumber, email, state, id];
                await pool.query(modify, values, (err, updated) => {
                    console.log("updateddd", updated)
                    if (updated) {
                        return res.status(200).json({
                                status: 'success',
                                data: {
                                    message: 'Senator successfully updated',
                                    name: updated[0].name,
                                    email: updated[0].email,
                                    phoneNumber: updated[0].phoneNumber,
                                    state: updated[0].state
                                }
                            });
                        } else {
                        return res.status(400).json({
                            status: "error",
                            error: "Unable to update senator at the moment, Pls try again later.",
                        });
                    }
                })
            })
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

            const check = `SELECT * FROM senators WHERE id=?`;
            const checkValue = [id];
            await pool.query(check, checkValue, (err, result) => {
                if (result.length == 0) {
                    return res.status(400).json({
                        status: "error",
                        error: "senator does not exist",
                    });
                }
            })

            const remove = `DELETE FROM senators WHERE id=?`;
            const value = [id];
            const removeQuery = await pool.query(remove, value, (err, results) => {
                if (results) {
                    return res.status(400).json({
                        status: 'success',
                        data: {
                            message: 'senator deleted successfully',
                            data: removeQuery.rows
                        }
                    });
                }
            })
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
            await pool.query(check, checkValue, async (err, result) => {
                if (result.length == 0) {
                    return res.status(400).json({
                        status: "error",
                        error: "senator does not exist",
                    });
                }
            let newResult = JSON.stringify(result);
            newResult = JSON.parse(newResult);
            const findState = `SELECT * FROM states WHERE id=?`;
            const stateValue = [newResult[0].state];
            const findId = await pool.query(findState, stateValue);
            let state = findId.rows[0].state;
                res.status(200).json({
                    status: 'success',
                    data: {
                        message: 'Found one',
                        name: newResult[0].name,
                        email: newResult[0].email,
                        phoneNumber: newResult[0].phoneNumber,
                        state
                    }
                });
            })
        } catch (error) {
            console.log("error on find one", error)

        }
    },
    async getAllSenators(req, res) {
        try {
                // get all senators query 
            await pool.query(`SELECT * FROM senators`, (err, result) => {
                if (result.length > 0) {
                    res.status(200).json({
                        status: 'success',
                        data: result
                    });
                } else if (result.length == 0) {
                    res.status(200).json({
                        status: 'error',
                        error: "No records at the moment"
                    });
                } else {
                    return res.status(400).json({
                    status: 'error',
                    error: 'Sorry, there are no senators at the moment'
                });
                }
            
            })
        }
        catch (e) {
            console.log(e)
        }
    },
}
// export senator controller to routes
module.exports = senatorController;
